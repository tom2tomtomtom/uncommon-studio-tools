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
      return NextResponse.json({ error: 'No API key found. Add your API key in Settings to start using the chat.' }, { status: 400 });
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
        const errorBody = await response.text();
        console.error('Anthropic API error:', errorBody);
        if (response.status === 401) {
          return NextResponse.json(
            { error: 'Your Anthropic API key was not accepted. Check that it is correct in Settings and try again.' },
            { status: 401 }
          );
        }
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Rate limit reached. Wait a moment and try again, or check your Anthropic plan usage.' },
            { status: 429 }
          );
        }
        return NextResponse.json(
          { error: 'Claude could not process your request right now. Try again in a few seconds.' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({
        content: data.content?.[0]?.text || 'No response was returned. Try rephrasing your message.',
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
        const errorBody = await response.text();
        console.error('Perplexity API error:', errorBody);
        if (response.status === 401) {
          return NextResponse.json(
            { error: 'Your Perplexity API key was not accepted. Check that it is correct in Settings and try again.' },
            { status: 401 }
          );
        }
        if (response.status === 429) {
          return NextResponse.json(
            { error: 'Rate limit reached. Wait a moment and try again, or check your Perplexity plan usage.' },
            { status: 429 }
          );
        }
        return NextResponse.json(
          { error: 'Perplexity could not process your request right now. Try again in a few seconds.' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({
        content: data.choices?.[0]?.message?.content || 'No response was returned. Try rephrasing your message.',
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong on our end. Refresh the page and try again.' },
      { status: 500 }
    );
  }
}
