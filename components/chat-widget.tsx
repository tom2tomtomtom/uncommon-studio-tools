'use client';

import { useState, useRef, useEffect, type ComponentPropsWithoutRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { prompts, teams } from '@/lib/prompts';
import { MessageCircle, X, Send, Loader2, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: Recommendation[];
  followUps?: FollowUp[];
}

let messageCounter = 0;
function nextMessageId() {
  return `msg-${Date.now()}-${++messageCounter}`;
}

const MESSAGES_STORAGE = 'uncommon-ai-chat-v2';

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
    { slug: 'prompt-generator', title: 'Prompt Generator', type: 'Page' as const },
  ],
};

const TEAM_DESCRIPTIONS: Record<string, string> = {
  'creative': 'Develop campaign concepts, brainstorm ideas, and craft compelling creative work with AI-powered tools.',
  'strategy': 'Build brand positioning, competitive analysis, and strategic frameworks for client campaigns.',
  'account-management': 'Strengthen client relationships with AI-assisted briefs, status reports, and communication tools.',
  'production': 'Streamline production workflows from spec sheets to production partner briefs and asset management.',
  'design': 'Accelerate design workflows with AI-powered mood boards, layout concepts, and visual direction.',
  'digital': 'Plan and optimize digital campaigns, SEO, paid media, and performance marketing.',
  'copywriting': 'Write headlines, scripts, taglines, and long-form copy with AI-assisted drafting tools.',
  'new-business': 'Win new business with AI-assisted proposals, pitch decks, and RFP responses.',
  'project-management': 'Keep projects on track with AI-powered timelines, resource plans, and status updates.',
  'studio-operations': 'Optimize studio workflows, capacity planning, and operational processes.',
  'finance': 'Manage invoices, expenses, budgets, and financial compliance with AI-powered analysis and automation tools.',
};

const TEAM_SPECIAL_CONTENT: Record<string, string> = {
  'strategy': 'This page also features a "Research & Insights with AI Tools" guide — a practical walkthrough of using Claude (Projects, Research mode, prompt craft, Cowork) and Google NotebookLM (source-grounded notebooks, audio overviews, mind maps, data tables) together for strategy research. It covers the "Ping-Pong Method" workflow, a 15-minute demo script, and rules of engagement.',
};

// Build compact prompt index grouped by team (with short descriptions)
const PROMPT_INDEX = (() => {
  const grouped: Record<string, string[]> = {};
  for (const p of prompts) {
    if (!grouped[p.teamName]) grouped[p.teamName] = [];
    const shortDesc = p.description.split('.')[0];
    grouped[p.teamName].push(`${p.id} ${p.name} — ${shortDesc}`);
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
      const desc = TEAM_DESCRIPTIONS[team.slug] || '';
      const promptList = teamPrompts.map(p => `- ${p.name}: ${p.description.split('.')[0]}`).join('\n');
      const special = TEAM_SPECIAL_CONTENT[team.slug] || '';
      pageContext = `The user is browsing the ${team.name} department (${teamPrompts.length} prompts).\nDepartment description: ${desc}\n\nPrompts on this page:\n${promptList}${special ? `\n\nSpecial content: ${special}` : ''}`;
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

  return `You are Uncommon AI, a knowledgeable creative and advertising assistant built into the Uncommon Studio AI Tools toolkit.
You have broad expertise in advertising, campaigns, strategy, copywriting, design, production, and creative processes.
The toolkit has ${teams.length} departments, ${prompts.length}+ AI prompts, and comprehensive guides for AI tools.

CURRENT PAGE CONTEXT: ${pageContext}
${userContextSection}
AVAILABLE PROMPTS (link format: /team/{teamSlug}#{id}):
${PROMPT_INDEX}

GUIDES (link format: /guides/{slug}):
${APP_PAGES.guides.map(g => `- ${g.slug}: ${g.title}`).join('\n')}

DEPARTMENTS (link format: /team/{slug}):
${teams.map(t => `- ${t.slug}: ${t.name} (${t.solutionCount} tools)`).join('\n')}

OTHER PAGES:
- /tips: Expert tips and shortcuts
- /plugins: Cowork plugins library
- /guides: All guides overview
- /search: Search prompts

RULES:
1. **Be a creative partner, not a link dispenser.** Teach techniques, share frameworks, give examples, and offer practical advice. Each response should help the user think through their problem.
2. **Ask before assuming.** If a question is broad or ambiguous, ask a clarifying question rather than giving a generic answer with links.
3. **Recommend toolkit resources sparingly.** Include recommendations only when genuinely relevant — omit them for greetings or simple questions. When you do recommend, explain why the resource is useful.
4. **Build on the conversation.** Never repeat recommendations. Go deeper — offer alternative tools, workflow tips, or related prompts the user hasn't seen.
5. **Be concise but substantive.** 2-4 short paragraphs with markdown formatting (**bold**, *italic*, \`code\`, - bullet lists).
6. **ONLY use URLs from the lists above.** Never invent or guess URLs. Every url must be one of: /team/{slug}#{id}, /guides/{slug}, /tips, /plugins, /search, /guides, or /
7. **You have broad advertising and creative knowledge.** Answer questions about campaigns, strategy, copywriting, design, production, media, and creative processes freely. Be honest about what you genuinely cannot do (browse the web, access files, execute code) but never refuse a creative or advertising question just because it's not about the toolkit.`;
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
      { label: 'Compare AI tools', message: 'Help me choose between Claude and other AI tools.' },
    ];
  }

  // Default starters for homepage / other pages
  return [
    { label: 'Great headlines', message: 'What makes a great advertising headline?' },
    { label: 'Write a brief', message: 'I need to write a creative brief. What should I include?' },
    { label: 'Explore departments', message: 'Give me an overview of all the departments and what they do.' },
    { label: 'AI in creative', message: 'How should I use AI tools in my creative process?' },
  ];
}

// Chat-optimized markdown components (compact spacing for small widget)
const chatMarkdownComponents = {
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="my-1" {...props}>{children}</p>
  ),
  strong: ({ children, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold" {...props}>{children}</strong>
  ),
  em: ({ children, ...props }: ComponentPropsWithoutRef<'em'>) => (
    <em {...props}>{children}</em>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside space-y-1 my-1" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside space-y-1 my-1" {...props}>{children}</ol>
  ),
  code: ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const isBlock = className?.includes('language-');
    return isBlock ? (
      <code className={`block bg-muted-foreground/10 p-2 rounded text-xs my-1 overflow-x-auto ${className || ''}`} {...props}>{children}</code>
    ) : (
      <code className="bg-muted-foreground/15 px-1 rounded text-xs" {...props}>{children}</code>
    );
  },
  a: ({ children, href, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a href={href} className="text-primary underline hover:no-underline" target={href?.startsWith('http') ? '_blank' : undefined} {...props}>{children}</a>
  ),
};

// --- Extracted sub-components ---

function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
          msg.role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        }`}
      >
        {msg.role === 'assistant' ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={chatMarkdownComponents}>
            {msg.content}
          </ReactMarkdown>
        ) : msg.content}
      </div>
    </div>
  );
}

function RecommendationChips({ recommendations, onClose }: { recommendations: Recommendation[]; onClose: () => void }) {
  if (!recommendations.length) return null;
  return (
    <div className="flex flex-wrap gap-2 ml-1">
      {recommendations.map((rec, rIdx) => (
        <Link
          key={rIdx}
          href={rec.url}
          onClick={onClose}
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
  );
}

function ActionChips({ items, onSelect, disabled }: { items: { label: string; message: string }[]; onSelect: (message: string) => void; disabled: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5 ml-1">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => onSelect(item.message)}
          disabled={disabled}
          className="text-xs px-2.5 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm **Uncommon AI**, your creative assistant. Ask me anything about campaigns, strategy, copywriting, design, or AI workflows — and I'll point you to the right toolkit resources along the way.",
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

  // Persist messages to localStorage (cap at 100 messages)
  useEffect(() => {
    if (isHydrated) {
      const capped = messages.length > 100 ? messages.slice(-100) : messages;
      localStorage.setItem(MESSAGES_STORAGE, JSON.stringify(capped));
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
    setMessages(prev => [...prev, { id: nextMessageId(), role: 'user', content: messageText }]);
    setIsLoading(true);

    try {
      const systemPrompt = buildSystemPrompt(pathname, { favorites, recentlyUsed });

      // Cap history at last 20 messages for API call
      const allMessages: Message[] = [...messages, { id: nextMessageId(), role: 'user', content: messageText }];
      const apiMessages = allMessages
        .map(m => ({ role: m.role, content: m.content }))
        .slice(-20);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          systemPrompt,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, { id: nextMessageId(), role: 'assistant', content: data.error }]);
        return;
      }

      setMessages(prev => [...prev, {
        id: nextMessageId(),
        role: 'assistant',
        content: data.text || 'Something went wrong on our end. Try sending your message again.',
        recommendations: data.recommendations || [],
        followUps: data.followUps || [],
      }]);
    } catch (err) {
      const message = err instanceof DOMException && err.name === 'AbortError'
        ? 'The request timed out. The AI service may be busy — try again in a moment.'
        : 'I couldn\'t connect just now. Check your internet connection and try again.';
      setMessages(prev => [...prev, { id: nextMessageId(), role: 'assistant', content: message }]);
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
                  <div key={msg.id} className="space-y-2">
                    <MessageBubble msg={msg} />

                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <RecommendationChips recommendations={msg.recommendations} onClose={() => setIsOpen(false)} />
                    )}

                    {msg.role === 'assistant' && msg.followUps && msg.followUps.length > 0 && i === messages.length - 1 && (
                      <ActionChips items={msg.followUps} onSelect={sendMessageDirect} disabled={isLoading} />
                    )}
                  </div>
                ))}

                {messages.length === 1 && (
                  <ActionChips items={starters} onSelect={sendMessageDirect} disabled={isLoading} />
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
