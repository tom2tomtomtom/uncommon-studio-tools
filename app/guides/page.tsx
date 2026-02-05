import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  BookOpen,
  Settings,
  Terminal,
  Bot,
  Search,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Chrome,
  Plug,
  FolderOpen,
  Puzzle,
  Compass,
  Mic,
  Workflow,
  Video,
  AudioLines,
  Presentation,
  Brain
} from 'lucide-react';

// Claude Enterprise
const claudeGuides = [
  {
    slug: 'projects',
    title: 'The Art of Project Setup',
    description: 'Create context containers that make Claude your specialized consultant',
    icon: FolderOpen,
    difficulty: 'Beginner',
    time: '15 min',
    color: 'text-emerald-500',
  },
  {
    slug: 'mcp-setup',
    title: 'MCP Configuration',
    description: 'Set up Model Context Protocol to give Claude access to your files and tools',
    icon: Settings,
    difficulty: 'Beginner',
    time: '10 min',
    color: 'text-blue-500',
  },
  {
    slug: 'claude-code',
    title: 'Claude Code for Non-Coders',
    description: 'Use the command-line interface to manage projects with plain English',
    icon: Terminal,
    difficulty: 'Beginner',
    time: '15 min',
    color: 'text-green-500',
  },
  {
    slug: 'artifacts',
    title: 'Mastering Artifacts',
    description: 'Build interactive apps, visualize data, and manage complex documents',
    icon: Layers,
    difficulty: 'Beginner',
    time: '15 min',
    color: 'text-indigo-500',
  },
  {
    slug: 'cowork',
    title: 'Cowork: The Autonomous Agent',
    description: 'Assign multi-step jobs that Claude executes while you do other work',
    icon: Bot,
    difficulty: 'Intermediate',
    time: '20 min',
    color: 'text-purple-500',
  },
  {
    slug: 'cowork-plugins',
    title: 'Cowork Plugins',
    description: 'Transform Claude into a specialized employee with role-based skill bundles',
    icon: Puzzle,
    difficulty: 'Intermediate',
    time: '20 min',
    color: 'text-purple-500',
  },
  {
    slug: 'deep-research',
    title: 'Deep Research & Synthesis',
    description: 'Run research missions that combine web searches with local documents',
    icon: Search,
    difficulty: 'Intermediate',
    time: '15 min',
    color: 'text-orange-500',
  },
  {
    slug: 'custom-skills',
    title: 'Custom Skills',
    description: 'Install repeatable instructions so you never paste the same context twice',
    icon: Sparkles,
    difficulty: 'Intermediate',
    time: '20 min',
    color: 'text-pink-500',
  },
  {
    slug: 'connectors',
    title: 'Connectors & Integrations',
    description: 'Connect Claude to Google Workspace, GitHub, and any SaaS tool via MCP',
    icon: Plug,
    difficulty: 'Intermediate',
    time: '20 min',
    color: 'text-cyan-500',
  },
  {
    slug: 'chrome-extension',
    title: 'Claude in Chrome',
    description: 'Turn your browser into an agentic workspace with workflow recording',
    icon: Chrome,
    difficulty: 'Intermediate',
    time: '15 min',
    color: 'text-blue-500',
  },
  {
    slug: 'power-hacks',
    title: 'Power Hacks & Optimization',
    description: 'Advanced techniques for speed and automation',
    icon: Zap,
    difficulty: 'Advanced',
    time: '25 min',
    color: 'text-amber-500',
  },
];

// Google
const googleGuides = [
  {
    slug: 'notebooklm',
    title: 'NotebookLM',
    description: 'Transform documents into AI-powered study guides with Audio Overviews',
    icon: Mic,
    difficulty: 'Beginner',
    time: '15 min',
    color: 'text-rose-500',
  },
];

// Perplexity Enterprise Pro
const perplexityGuides = [
  {
    slug: 'perplexity',
    title: 'Perplexity AI',
    description: 'Master Pro Search, Spaces, Focus Modes, and the Sonar API for research',
    icon: Compass,
    difficulty: 'Beginner',
    time: '15 min',
    color: 'text-teal-500',
  },
];

// n8n
const n8nGuides = [
  {
    slug: 'n8n',
    title: 'n8n Workflow Automation',
    description: 'Build AI-powered automations with code-level flexibility and self-hosting',
    icon: Workflow,
    difficulty: 'Intermediate',
    time: '25 min',
    color: 'text-green-500',
  },
];

// Runway Enterprise
const runwayGuides = [
  {
    slug: 'runway',
    title: 'Runway Video Generation',
    description: 'Create AI video from text, animate images, and use motion controls',
    icon: Video,
    difficulty: 'Intermediate',
    time: '20 min',
    color: 'text-purple-500',
  },
];

// ElevenLabs
const elevenLabsGuides = [
  {
    slug: 'elevenlabs',
    title: 'ElevenLabs Voice AI',
    description: 'Generate lifelike speech, clone voices, and dub content in 32 languages',
    icon: AudioLines,
    difficulty: 'Beginner',
    time: '15 min',
    color: 'text-pink-500',
  },
];

// AIDEN Studio
const aidenGuides = [
  {
    slug: 'aiden-studio',
    title: 'AIDEN Studio',
    description: 'AI Creative Director for campaign strategy and asset creation',
    icon: Brain,
    difficulty: 'Intermediate',
    time: '20 min',
    color: 'text-red-500',
  },
];

// Gamma
const gammaGuides = [
  {
    slug: 'gamma',
    title: 'Gamma Presentations',
    description: 'AI-powered presentations that design themselves from a single prompt',
    icon: Presentation,
    difficulty: 'Beginner',
    time: '15 min',
    color: 'text-yellow-500',
  },
];

interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  difficulty: string;
  time: string;
  color: string;
}

interface ToolSection {
  title: string;
  guides: Guide[];
  color: string;
}

const sections: ToolSection[] = [
  { title: 'Claude Enterprise', guides: claudeGuides, color: 'text-orange-500' },
  { title: 'Google', guides: googleGuides, color: 'text-blue-500' },
  { title: 'Perplexity Enterprise Pro', guides: perplexityGuides, color: 'text-teal-500' },
  { title: 'n8n', guides: n8nGuides, color: 'text-green-500' },
  { title: 'Runway Enterprise', guides: runwayGuides, color: 'text-purple-500' },
  { title: 'ElevenLabs', guides: elevenLabsGuides, color: 'text-pink-500' },
  { title: 'AIDEN Studio', guides: aidenGuides, color: 'text-red-500' },
  { title: 'Gamma', guides: gammaGuides, color: 'text-yellow-500' },
];

function GuideCard({ guide }: { guide: Guide }) {
  const Icon = guide.icon;
  return (
    <Link href={`/guides/${guide.slug}`}>
      <Card className="hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`${guide.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {guide.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {guide.description}
                </CardDescription>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Badge variant="secondary">{guide.difficulty}</Badge>
            <Badge variant="outline">{guide.time}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function GuidesPage() {
  const totalGuides = sections.reduce((acc, section) => acc + section.guides.length, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Guides</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Getting Started Guides</h1>
            <p className="text-muted-foreground">{totalGuides} tutorials across {sections.length} AI platforms</p>
          </div>
        </div>
      </div>

      {/* Intro Card */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            These guides are designed for non-technical users. Each one walks you through a specific AI tool or feature
            with plain-English explanations and copy-paste commands. No coding experience required.
          </p>
        </CardContent>
      </Card>

      {/* Tool Sections */}
      {sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className={`text-xl font-semibold ${section.color}`}>{section.title}</h2>
            <Badge variant="outline" className="text-xs">
              {section.guides.length} {section.guides.length === 1 ? 'guide' : 'guides'}
            </Badge>
          </div>
          <div className="grid gap-4">
            {section.guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      ))}

      {/* Quick Tips Link */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Looking for quick tips instead?</h3>
              <p className="text-sm text-muted-foreground">
                Check out our collection of power-user techniques and shortcuts.
              </p>
            </div>
            <Link
              href="/tips"
              className="flex items-center gap-1 text-primary hover:underline font-medium"
            >
              Expert Tips
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
