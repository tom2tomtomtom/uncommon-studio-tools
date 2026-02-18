import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';

// --- Validation schema tests (unchanged) ---

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(10000),
});

const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
  systemPrompt: z.string().max(20000),
});

describe('Chat API validation', () => {
  it('accepts valid request', () => {
    const result = ChatRequestSchema.safeParse({
      messages: [{ role: 'user', content: 'Hello' }],
      systemPrompt: 'You are a helpful assistant.',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.messages).toHaveLength(1);
    }
  });

  it('rejects empty messages', () => {
    const result = ChatRequestSchema.safeParse({
      messages: [],
      systemPrompt: 'test',
    });
    expect(result.success).toBe(false);
  });

  it('rejects too many messages', () => {
    const messages = Array.from({ length: 51 }, (_, i) => ({
      role: 'user' as const,
      content: `Message ${i}`,
    }));
    const result = ChatRequestSchema.safeParse({
      messages,
      systemPrompt: 'test',
    });
    expect(result.success).toBe(false);
  });

  it('rejects message content over 10000 chars', () => {
    const result = ChatRequestSchema.safeParse({
      messages: [{ role: 'user', content: 'x'.repeat(10001) }],
      systemPrompt: 'test',
    });
    expect(result.success).toBe(false);
  });

  it('rejects system prompt over 20000 chars', () => {
    const result = ChatRequestSchema.safeParse({
      messages: [{ role: 'user', content: 'Hello' }],
      systemPrompt: 'x'.repeat(20001),
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid role', () => {
    const result = ChatRequestSchema.safeParse({
      messages: [{ role: 'system', content: 'Hello' }],
      systemPrompt: 'test',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing systemPrompt', () => {
    const result = ChatRequestSchema.safeParse({
      messages: [{ role: 'user', content: 'Hello' }],
    });
    expect(result.success).toBe(false);
  });
});

// --- Tool use response extraction tests ---

// Helper to simulate the server-side extraction logic from route.ts
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

function extractResponse(content: ContentBlock[]) {
  const toolBlock = content.find(
    (b): b is ToolUseBlock => b.type === 'tool_use' && b.name === 'format_response'
  );

  if (toolBlock) {
    return {
      text: toolBlock.input.text,
      recommendations: toolBlock.input.recommendations || [],
      followUps: toolBlock.input.followUps || [],
    };
  }

  const textParts = content
    .filter((b): b is TextBlock => b.type === 'text')
    .map(b => b.text);
  const text = textParts.join('\n') || 'No response was returned. Try rephrasing your message.';

  return {
    text,
    recommendations: [],
    followUps: [
      { label: 'Tell me more', message: 'Can you tell me more about that?' },
      { label: 'What else?', message: 'What else can you help with?' },
    ],
  };
}

describe('Tool use response extraction', () => {
  it('extracts structured data from format_response tool use', () => {
    const content: ContentBlock[] = [
      {
        type: 'tool_use',
        name: 'format_response',
        input: {
          text: 'Here is some advice about creative briefs.',
          recommendations: [
            { title: 'Production Scope/Brief', url: '/team/production#production-1', type: 'Prompt' },
          ],
          followUps: [
            { label: 'Show me an example', message: 'Can you show me an example creative brief?' },
            { label: 'What to include?', message: 'What sections should a creative brief have?' },
          ],
        },
      },
    ];

    const result = extractResponse(content);

    expect(result.text).toBe('Here is some advice about creative briefs.');
    expect(result.recommendations).toHaveLength(1);
    expect(result.recommendations[0].url).toBe('/team/production#production-1');
    expect(result.followUps).toHaveLength(2);
  });

  it('handles plain text response when Claude does not use the tool', () => {
    const content: ContentBlock[] = [
      { type: 'text', text: 'Hello! How can I help you today?' },
    ];

    const result = extractResponse(content);

    expect(result.text).toBe('Hello! How can I help you today?');
    expect(result.recommendations).toEqual([]);
    expect(result.followUps).toHaveLength(2);
    expect(result.followUps[0].label).toBe('Tell me more');
  });

  it('handles mixed content blocks, preferring tool_use', () => {
    const content: ContentBlock[] = [
      { type: 'text', text: 'Let me look that up for you.' },
      {
        type: 'tool_use',
        name: 'format_response',
        input: {
          text: 'Here are the best tools for copywriting.',
          recommendations: [
            { title: 'Copywriting', url: '/team/copywriting', type: 'Department' },
          ],
          followUps: [
            { label: 'Tell me more', message: 'Tell me more about the copywriting tools' },
          ],
        },
      },
    ];

    const result = extractResponse(content);

    expect(result.text).toBe('Here are the best tools for copywriting.');
    expect(result.recommendations).toHaveLength(1);
    expect(result.recommendations[0].title).toBe('Copywriting');
  });

  it('handles tool_use with no recommendations', () => {
    const content: ContentBlock[] = [
      {
        type: 'tool_use',
        name: 'format_response',
        input: {
          text: 'Great question! Here is my take on campaign strategy.',
          followUps: [
            { label: 'Go deeper', message: 'Tell me more about this strategy' },
          ],
        },
      },
    ];

    const result = extractResponse(content);

    expect(result.text).toBe('Great question! Here is my take on campaign strategy.');
    expect(result.recommendations).toEqual([]);
    expect(result.followUps).toHaveLength(1);
  });

  it('handles empty content array', () => {
    const result = extractResponse([]);

    expect(result.text).toBe('No response was returned. Try rephrasing your message.');
    expect(result.recommendations).toEqual([]);
    expect(result.followUps).toHaveLength(2);
  });

  it('ignores tool_use blocks with different tool names', () => {
    const content: ContentBlock[] = [
      { type: 'text', text: 'Some text response.' },
      {
        type: 'tool_use',
        name: 'some_other_tool',
        input: {
          text: 'This should be ignored.',
          followUps: [],
        },
      },
    ];

    const result = extractResponse(content);

    expect(result.text).toBe('Some text response.');
    expect(result.recommendations).toEqual([]);
  });

  it('joins multiple text blocks with newlines', () => {
    const content: ContentBlock[] = [
      { type: 'text', text: 'First paragraph.' },
      { type: 'text', text: 'Second paragraph.' },
    ];

    const result = extractResponse(content);

    expect(result.text).toBe('First paragraph.\nSecond paragraph.');
  });
});
