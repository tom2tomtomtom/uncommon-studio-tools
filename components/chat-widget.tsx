'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { prompts, teams } from '@/lib/prompts';
import { MessageCircle, X, Send, Loader2, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface FollowUp {
  label: string;
  message: string;
}

interface ConversationStarter {
  label: string;
  message: string;
}

interface Recommendation {
  title: string;
  url: string;
  type: 'Guide' | 'Department' | 'Prompt' | 'Page';
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: Recommendation[];
  followUps?: FollowUp[];
}

const MESSAGES_STORAGE = 'uncommon-ai-chat-messages';

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
    { slug: 'getting-started', title: 'Getting Started', type: 'Guide' as const },
    { slug: 'google-ai-suite', title: 'Google AI Suite', type: 'Guide' as const },
    { slug: 'model-selection', title: 'AI Model Selection', type: 'Guide' as const },
    { slug: 'multi-tool-workflows', title: 'Multi-Tool Workflows', type: 'Guide' as const },
    { slug: 'tool-governance', title: 'Tool Governance', type: 'Guide' as const },
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

// Build compact prompt index grouped by team
const PROMPT_INDEX = (() => {
  const grouped: Record<string, string[]> = {};
  for (const p of prompts) {
    if (!grouped[p.teamName]) grouped[p.teamName] = [];
    grouped[p.teamName].push(`${p.id} ${p.name}`);
  }
  return Object.entries(grouped)
    .map(([team, entries]) => `${team}: ${entries.join(' | ')}`)
    .join('\n');
})();

function buildSystemPrompt(pathname: string, userContext?: { favorites: string[]; recentlyUsed: string[] }): string {
  // Determine current page context
  let pageContext = 'The user is on the homepage.';
  const teamMatch = pathname.match(/^\/team\/([^/]+)/);
  const guideMatch = pathname.match(/^\/guides\/([^/]+)/);
  if (teamMatch) {
    const team = teams.find(t => t.slug === teamMatch[1]);
    if (team) {
      const teamPrompts = prompts.filter(p => p.teamSlug === team.slug);
      pageContext = `The user is browsing the ${team.name} department (${teamPrompts.length} prompts).`;
    }
  } else if (guideMatch) {
    const guide = APP_PAGES.guides.find(g => g.slug === guideMatch[1]);
    if (guide) {
      pageContext = `The user is reading the "${guide.title}" guide.`;
    }
  } else if (pathname === '/guides') {
    pageContext = 'The user is on the Guides overview page.';
  } else if (pathname === '/plugins') {
    pageContext = 'The user is on the Cowork Plugins page.';
  } else if (pathname === '/tips') {
    pageContext = 'The user is on the Expert Tips page.';
  } else if (pathname === '/favorites') {
    pageContext = 'The user is viewing their Favorites.';
  }

  // Build user context section
  let userContextSection = '';
  if (userContext) {
    const parts: string[] = [];
    if (userContext.favorites.length > 0) {
      const favNames = userContext.favorites
        .map(id => prompts.find(p => p.id === id)?.name)
        .filter(Boolean)
        .slice(0, 5);
      if (favNames.length > 0) parts.push(`User's favorites: ${favNames.join(', ')}`);
    }
    if (userContext.recentlyUsed.length > 0) {
      const recentNames = userContext.recentlyUsed
        .map(id => prompts.find(p => p.id === id)?.name)
        .filter(Boolean)
        .slice(0, 5);
      if (recentNames.length > 0) parts.push(`User recently used: ${recentNames.join(', ')}`);
    }
    if (parts.length > 0) {
      userContextSection = `\nUSER CONTEXT:\n${parts.join('\n')}\n`;
    }
  }

  return `You are Uncommon AI, a helpful assistant for the Uncommon Studio AI Tools creative toolkit.
The toolkit has ${teams.length} departments, ${prompts.length}+ AI prompts, and comprehensive guides for AI tools.

CURRENT PAGE CONTEXT: ${pageContext}
${userContextSection}
RESPONSE FORMAT: You must respond with RAW JSON only (no markdown code fences). Use this exact format:
{
  "text": "Your response here. Use **bold**, *italic*, \`code\`, and - bullet lists for formatting.",
  "recommendations": [{"title": "Display Name", "url": "/path/to/page", "type": "Guide" | "Department" | "Prompt" | "Page"}],
  "followUps": [{"label": "Short button label", "message": "Full message to send"}]
}

AVAILABLE PROMPTS (link format: /team/{teamSlug}#{id}):
${PROMPT_INDEX}

GUIDES (link format: /guides/{slug}):
${APP_PAGES.guides.map(g => `- ${g.slug}: ${g.title}`).join('\n')}

DEPARTMENTS (link format: /team/{slug}):
${teams.map(t => `- ${t.slug}: ${t.name} (${t.solutionCount} prompts)`).join('\n')}

OTHER PAGES:
- /tips: Expert tips and shortcuts
- /plugins: Cowork plugins library
- /guides: All guides overview
- /search: Search prompts

RULES:
1. Recommend specific prompts by name and id when relevant — use type "Prompt" with url /team/{teamSlug}#{id}
2. Return 1-3 relevant recommendations based on the query
3. Always include 2-3 followUps to continue the conversation
4. Use markdown in text: **bold**, *italic*, \`code\`, - bullet lists
5. Be concise in "text" — explain WHY you're recommending
6. URLs must match the patterns above exactly
7. Output RAW JSON only — no markdown code fences, no extra text
8. If greeting, return empty recommendations []`;
}

function getConversationStarters(pathname: string): ConversationStarter[] {
  const teamMatch = pathname.match(/^\/team\/([^/]+)/);
  if (teamMatch) {
    const team = teams.find(t => t.slug === teamMatch[1]);
    if (team) {
      const teamPrompts = prompts.filter(p => p.teamSlug === team.slug);
      return [
        { label: `What can ${team.name} do?`, message: `What tools does the ${team.name} department offer?` },
        { label: 'Recommend a tool', message: `Which ${team.name} tool should I start with?` },
        { label: 'Compare tools', message: `How do the ${team.name} tools differ from each other?` },
        ...(teamPrompts[0] ? [{ label: `About ${teamPrompts[0].name.split(' ').slice(0, 3).join(' ')}...`, message: `Tell me about the ${teamPrompts[0].name} tool` }] : []),
      ].slice(0, 4);
    }
  }

  if (pathname.startsWith('/guides')) {
    return [
      { label: 'Getting started', message: 'I\'m new to AI tools. Where should I start?' },
      { label: 'Best for research', message: 'Which guides help with research tasks?' },
      { label: 'Automation setup', message: 'How do I set up workflow automation?' },
      { label: 'Compare AI tools', message: 'Help me choose between Claude, Perplexity, and Gemini.' },
    ];
  }

  // Default starters for homepage / other pages
  return [
    { label: 'Help me write a brief', message: 'I need to write a creative brief. Which tool should I use?' },
    { label: 'Explore departments', message: 'Give me an overview of all the departments and what they do.' },
    { label: 'AI guides', message: 'What guides do you have for learning AI tools?' },
    { label: 'Media & PR tools', message: 'What tools do you have for media relations and PR?' },
  ];
}

// Lightweight markdown renderer
function renderInlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={key++}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(<code key={key++} className="bg-muted-foreground/15 px-1 rounded text-xs">{match[4]}</code>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

function renderMarkdown(text: string): ReactNode {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-1">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    const bulletMatch = line.match(/^[-*]\s+(.+)/);
    if (bulletMatch) {
      listItems.push(<li key={key++}>{renderInlineMarkdown(bulletMatch[1])}</li>);
    } else {
      flushList();
      if (line.trim() === '') {
        elements.push(<br key={key++} />);
      } else {
        elements.push(<p key={key++} className="my-1">{renderInlineMarkdown(line)}</p>);
      }
    }
  }
  flushList();

  return <>{elements}</>;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm **Uncommon AI**, your guide to our creative toolkit. Tell me what you're working on and I'll point you to the right prompts, departments, and guides.",
  recommendations: [],
};

export function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Load persisted messages on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_STORAGE);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Invalid stored data, keep defaults
    }
    setIsHydrated(true);
  }, []);

  // Persist messages to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(MESSAGES_STORAGE, JSON.stringify(messages));
    }
  }, [messages, isHydrated]);

  // Re-read user context when widget opens
  useEffect(() => {
    if (isOpen) {
      try {
        const favs = localStorage.getItem('agency-tools-favorites');
        if (favs) setFavorites(JSON.parse(favs));
      } catch { /* ignore */ }
      try {
        const recent = localStorage.getItem('agency-tools-recently-used');
        if (recent) setRecentlyUsed(JSON.parse(recent));
      } catch { /* ignore */ }
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startNewConversation = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  const sendMessageDirect = async (directMessage?: string) => {
    const messageText = directMessage || input.trim();
    if (!messageText) return;

    if (!directMessage) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setIsLoading(true);

    try {
      const systemPrompt = buildSystemPrompt(pathname, { favorites, recentlyUsed });

      // Cap history at last 20 messages for API call
      const allMessages = [...messages, { role: 'user' as const, content: messageText }];
      const apiMessages = allMessages
        .filter(m => !m.recommendations?.length || m.role === 'user')
        .map(m => ({ role: m.role, content: m.content }))
        .slice(-20);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          systemPrompt,
        }),
      });
      const data = await res.json();
      const responseContent = data.content || data.error || 'Something went wrong on our end. Try sending your message again.';

      // Try to parse JSON response
      let parsedResponse: { text: string; recommendations: Recommendation[]; followUps?: FollowUp[] } | null = null;
      try {
        let cleanContent = responseContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstBrace = cleanContent.indexOf('{');
        const lastBrace = cleanContent.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          const jsonStr = cleanContent.substring(firstBrace, lastBrace + 1);
          parsedResponse = JSON.parse(jsonStr);
        }
      } catch {
        parsedResponse = null;
      }

      if (parsedResponse && parsedResponse.text) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: parsedResponse.text,
          recommendations: parsedResponse.recommendations || [],
          followUps: Array.isArray(parsedResponse.followUps) ? parsedResponse.followUps : [],
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'I couldn\'t connect just now. Check your internet connection and try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const starters = getConversationStarters(pathname);

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
            aria-label="Open Uncommon AI chat assistant"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
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
                <span className="font-semibold">Uncommon AI</span>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={startNewConversation}
                    aria-label="New chat"
                    title="New chat"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
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
                        {msg.role === 'assistant'
                          ? renderMarkdown(msg.content)
                          : msg.content
                        }
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
                              rec.type === 'Department' ? 'bg-purple-500' :
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

                    {/* Follow-up buttons — only on the latest assistant message */}
                    {msg.role === 'assistant' && msg.followUps && msg.followUps.length > 0 && i === messages.length - 1 && (
                      <div className="flex flex-wrap gap-1.5 ml-1">
                        {msg.followUps.map((fu, j) => (
                          <button
                            key={j}
                            onClick={() => sendMessageDirect(fu.message)}
                            disabled={isLoading}
                            className="text-xs px-2.5 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                          >
                            {fu.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Conversation starters — shown when only welcome message exists */}
                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {starters.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessageDirect(s.message)}
                        disabled={isLoading}
                        className="text-xs px-2.5 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}

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
                  sendMessageDirect();
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
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
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
