import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(10000, 'Message content too long'),
});

const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50, 'Too many messages'),
  systemPrompt: z.string().max(20000, 'System prompt too long'),
});

const RESPONSE_TOOL = {
  name: 'format_response',
  description: 'Format your response with optional navigation recommendations and follow-up suggestions. Use this when you want to recommend specific toolkit pages, guides, or prompts. For simple conversational replies, respond without this tool.',
  input_schema: {
    type: 'object' as const,
    properties: {
      text: { type: 'string' as const, description: 'Your conversational response with markdown formatting' },
      recommendations: {
        type: 'array' as const,
        description: '0-3 relevant toolkit links. Omit if none are genuinely relevant.',
        items: {
          type: 'object' as const,
          properties: {
            title: { type: 'string' as const },
            url: { type: 'string' as const, description: 'URL like /team/creative#creative-1 or /guides/claude-code' },
            type: { type: 'string' as const, enum: ['Guide', 'Department', 'Prompt', 'Page'] },
          },
          required: ['title', 'url', 'type'],
        },
      },
      followUps: {
        type: 'array' as const,
        description: '2-3 follow-up suggestions to continue the conversation.',
        items: {
          type: 'object' as const,
          properties: {
            label: { type: 'string' as const, description: 'Short button label (2-5 words)' },
            message: { type: 'string' as const, description: 'Full message sent when clicked' },
          },
          required: ['label', 'message'],
        },
      },
    },
    required: ['text', 'followUps'],
  },
};

interface ToolUseBlock {
  type: 'tool_use';
  name: string;
  input: {
    text: string;
    recommendations?: { title: string; url: string; type: string }[];
    followUps: { label: string; message: string }[];
  };
}

interface TextBlock {
  type: 'text';
  text: string;
}

type ContentBlock = ToolUseBlock | TextBlock;

export async function POST(request: NextRequest) {
  try {
    // Reject oversized request bodies (100KB limit)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 100_000) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    }

    const body = await request.json();
    const parsed = ChatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request. Check your message format and try again.' },
        { status: 400 }
      );
    }

    const { messages, systemPrompt } = parsed.data;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service is not configured. Contact the site administrator.' },
        { status: 503 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 2048,
        system: systemPrompt,
        tools: [RESPONSE_TOOL],
        tool_choice: { type: 'auto' },
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        const errorBody = await response.text();
        console.error('Anthropic API error:', errorBody);
      }
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'AI service authentication failed. Contact the site administrator.' },
          { status: 502 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit reached. Wait a moment and try again.' },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: 'Claude could not process your request right now. Try again in a few seconds.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content: ContentBlock[] = data.content || [];

    // Extract from tool_use block if Claude used the format_response tool
    const toolBlock = content.find(
      (b): b is ToolUseBlock => b.type === 'tool_use' && b.name === 'format_response'
    );

    if (toolBlock) {
      return NextResponse.json({
        text: toolBlock.input.text,
        recommendations: toolBlock.input.recommendations || [],
        followUps: toolBlock.input.followUps || [],
      });
    }

    // Plain text response — Claude chose not to use the tool (e.g. greetings)
    const textParts = content
      .filter((b): b is TextBlock => b.type === 'text')
      .map(b => b.text);
    const text = textParts.join('\n') || 'No response was returned. Try rephrasing your message.';

    return NextResponse.json({
      text,
      recommendations: [],
      followUps: [
        { label: 'Tell me more', message: 'Can you tell me more about that?' },
        { label: 'What else?', message: 'What else can you help with?' },
      ],
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Chat API error:', error);
    }
    return NextResponse.json(
      { error: 'Something went wrong on our end. Refresh the page and try again.' },
      { status: 500 }
    );
  }
}
