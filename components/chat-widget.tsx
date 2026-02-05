'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { prompts, teams } from '@/lib/prompts';
import { MessageCircle, X, Send, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Recommendation {
  title: string;
  url: string;
  type: 'Guide' | 'Team' | 'Prompt' | 'Page';
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: Recommendation[];
}

// Build a map of all navigable pages
const APP_PAGES = {
  guides: [
    { slug: 'projects', title: 'Project Setup', type: 'Guide' as const },
    { slug: 'mcp-setup', title: 'MCP Configuration', type: 'Guide' as const },
    { slug: 'claude-code', title: 'Claude Code', type: 'Guide' as const },
    { slug: 'artifacts', title: 'Artifacts', type: 'Guide' as const },
    { slug: 'cowork', title: 'Cowork Agent', type: 'Guide' as const },
    { slug: 'cowork-plugins', title: 'Cowork Plugins', type: 'Guide' as const },
    { slug: 'deep-research', title: 'Deep Research', type: 'Guide' as const },
    { slug: 'custom-skills', title: 'Custom Skills', type: 'Guide' as const },
    { slug: 'connectors', title: 'Connectors & Integrations', type: 'Guide' as const },
    { slug: 'chrome-extension', title: 'Chrome Extension', type: 'Guide' as const },
    { slug: 'power-hacks', title: 'Power Hacks', type: 'Guide' as const },
    { slug: 'notebooklm', title: 'NotebookLM', type: 'Guide' as const },
    { slug: 'perplexity', title: 'Perplexity AI', type: 'Guide' as const },
    { slug: 'n8n', title: 'n8n Automation', type: 'Guide' as const },
    { slug: 'runway', title: 'Runway Video', type: 'Guide' as const },
    { slug: 'elevenlabs', title: 'ElevenLabs Voice', type: 'Guide' as const },
    { slug: 'gamma', title: 'Gamma Presentations', type: 'Guide' as const },
    { slug: 'aiden-studio', title: 'AIDEN Studio', type: 'Guide' as const },
  ],
  pages: [
    { slug: '', title: 'Home', type: 'Page' as const },
    { slug: 'guides', title: 'All Guides', type: 'Page' as const },
    { slug: 'tips', title: 'Expert Tips', type: 'Page' as const },
    { slug: 'plugins', title: 'Cowork Plugins', type: 'Page' as const },
    { slug: 'search', title: 'Search', type: 'Page' as const },
    { slug: 'favorites', title: 'Favorites', type: 'Page' as const },
  ],
};

const SYSTEM_PROMPT = `You are a helpful AI assistant for an AI toolkit with ${teams.length} specialized teams, ${prompts.length}+ AI prompts, and comprehensive guides for AI tools.

You MUST respond in this EXACT JSON format:
{
  "text": "Your helpful response explaining your recommendations...",
  "recommendations": [
    {
      "title": "Display Name",
      "url": "/path/to/page",
      "type": "Guide" | "Team" | "Prompt" | "Page"
    }
  ]
}

AVAILABLE RESOURCES:

**Guides (use /guides/slug):**
- projects: Setting up Claude Projects for context
- mcp-setup: Model Context Protocol configuration
- claude-code: Command-line interface for non-coders
- artifacts: Building interactive apps and documents
- cowork: Autonomous agent for multi-step tasks
- cowork-plugins: Role-based skill bundles
- deep-research: Research missions with web + local docs
- custom-skills: Repeatable instructions
- connectors: Google Workspace, GitHub integrations
- chrome-extension: Browser automation
- power-hacks: Advanced techniques
- notebooklm: Google's AI-powered study tool
- perplexity: Research and Pro Search
- n8n: Workflow automation
- runway: AI video generation
- elevenlabs: Voice AI and cloning
- gamma: AI presentations
- aiden-studio: AI Creative Director

**Teams (use /team/slug):**
${teams.map(t => `- ${t.slug}: ${t.name} (${t.solutionCount} prompts)`).join('\n')}

**Other Pages:**
- /tips: Expert tips and shortcuts
- /plugins: Cowork plugins library
- /guides: All guides overview
- /search: Search prompts

RULES:
1. Return 1-3 relevant recommendations based on the query
2. If greeting, return empty recommendations []
3. Be concise in "text" - explain WHY you're recommending
4. URLs must match the patterns above exactly
5. Output RAW JSON only, no markdown code blocks

ROUTING LOGIC:
- "video" → runway guide, creative team
- "voice", "audio", "speech" → elevenlabs guide
- "presentation", "deck", "slides" → gamma guide
- "automation", "workflow" → n8n guide
- "research" → deep-research guide, perplexity guide
- "creative", "campaign", "concept" → creative team, aiden-studio guide
- "strategy", "planning" → strategy team
- "copy", "writing", "content" → copywriting team
- "project", "context", "setup" → projects guide
- "code", "terminal", "CLI" → claude-code guide
- "browser", "chrome" → chrome-extension guide
- "tips", "shortcuts", "hacks" → tips page, power-hacks guide`;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. Tell me what you're working on and I'll recommend the best tools and guides!",
      recommendations: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.filter(m => !m.recommendations?.length || m.role === 'user').map(m => ({ role: m.role, content: m.content })), { role: 'user', content: userMessage }],
          systemPrompt: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      let responseContent = data.content || data.error || 'Sorry, something went wrong.';

      // Try to parse JSON response
      let parsedResponse: { text: string; recommendations: Recommendation[] } | null = null;
      try {
        // Clean up markdown code blocks if present
        let cleanContent = responseContent.replace(/```json/g, '').replace(/```/g, '').trim();

        // Find JSON in response
        const firstBrace = cleanContent.indexOf('{');
        const lastBrace = cleanContent.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          const jsonStr = cleanContent.substring(firstBrace, lastBrace + 1);
          parsedResponse = JSON.parse(jsonStr);
        }
      } catch {
        // If parsing fails, use plain text response
        parsedResponse = null;
      }

      if (parsedResponse && parsedResponse.text) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: parsedResponse.text,
          recommendations: parsedResponse.recommendations || []
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Failed to get a response. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">Need Help?</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Fixed positioning with viewport constraints */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-background border rounded-xl shadow-2xl flex flex-col"
            style={{
              maxHeight: 'calc(100vh - 6rem)',
              height: '500px'
            }}
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages - Scrollable */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 min-h-0"
            >
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className="space-y-2">
                    <div
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>

                    {/* Clickable Recommendations */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="flex flex-wrap gap-2 ml-1">
                        {msg.recommendations.map((rec, rIdx) => (
                          <Link
                            key={rIdx}
                            href={rec.url}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 bg-background border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-xs group"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              rec.type === 'Guide' ? 'bg-blue-500' :
                              rec.type === 'Team' ? 'bg-purple-500' :
                              rec.type === 'Prompt' ? 'bg-green-500' :
                              'bg-orange-500'
                            }`} />
                            <span className="font-medium group-hover:text-primary transition-colors">
                              {rec.title}
                            </span>
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input - Fixed at bottom */}
            <div className="p-4 border-t shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="What are you working on?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="text-sm"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
