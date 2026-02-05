import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  provider?: 'perplexity' | 'anthropic';
  apiKey?: string;
  messages: Message[];
  systemPrompt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { provider = 'anthropic', messages, systemPrompt } = body;

    // Use client API key if provided, otherwise fall back to server env var
    const apiKey = body.apiKey ||
      (provider === 'anthropic' ? process.env.ANTHROPIC_API_KEY : process.env.PERPLEXITY_API_KEY);

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 400 });
    }

    if (provider === 'anthropic') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-latest',
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Anthropic API error:', error);
        return NextResponse.json(
          { error: 'Failed to get response from Claude.' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({
        content: data.content?.[0]?.text || 'No response',
      });
    } else {
      // Perplexity
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'sonar',
          max_tokens: 1024,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({
              role: m.role,
              content: m.content,
            })),
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Perplexity API error:', error);
        return NextResponse.json(
          { error: 'Failed to get response from Perplexity.' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({
        content: data.choices?.[0]?.message?.content || 'No response',
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
