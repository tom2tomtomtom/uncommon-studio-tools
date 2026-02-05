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
  Chrome
} from 'lucide-react';

const guides = [
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
    description: 'Advanced techniques for cost savings, speed, and automation',
    icon: Zap,
    difficulty: 'Advanced',
    time: '25 min',
    color: 'text-amber-500',
  },
];

export default function GuidesPage() {
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
            <p className="text-muted-foreground">Step-by-step tutorials to master Claude's most powerful features</p>
          </div>
        </div>
      </div>

      {/* Intro Card */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            These guides are designed for non-technical users. Each one walks you through a specific Claude feature
            with plain-English explanations and copy-paste commands. No coding experience required.
          </p>
        </CardContent>
      </Card>

      {/* Guides Grid */}
      <div className="grid gap-4">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
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
        })}
      </div>

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
