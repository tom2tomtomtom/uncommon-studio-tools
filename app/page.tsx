import { teams, prompts } from '@/lib/prompts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecentlyUsed } from '@/components/recently-used';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Users, FileText, Download, Monitor, Globe, Image, Puzzle, Lightbulb } from 'lucide-react';

const teamIcons: Record<string, string> = {
  'creative': '🎨',
  'strategy': '🎯',
  'account-management': '👥',
  'production': '🎬',
  'design': '✏️',
  'digital': '📱',
  'copywriting': '✍️',
  'new-business': '💼',
  'project-management': '📋',
  'studio-operations': '⚙️',
};

export default function HomePage() {
  const totalPrompts = prompts.length;
  const totalTeams = teams.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
          Uncommon Studio
          <span className="text-primary"> AI Tools</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The creative advertising AI toolkit with {totalPrompts}+ prompts across {totalTeams} agency departments
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <StatCard icon={<FileText className="h-5 w-5" />} label="Prompts" value={totalPrompts} />
          <StatCard icon={<Users className="h-5 w-5" />} label="Departments" value={totalTeams} />
          <StatCard icon={<Zap className="h-5 w-5" />} label="Tools" value="4 AI Tools" />
        </div>
      </div>

      {/* Plugins CTA */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Puzzle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">New: Cowork Plugins</h3>
              <p className="text-sm text-muted-foreground">Install once, use forever. Turn Claude into a specialist for your department.</p>
            </div>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/plugins">
              Explore Plugins
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Expert Tips CTA */}
      <Card className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background border-amber-500/20 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Expert Tips & Meta-Workflows</h3>
              <p className="text-sm text-muted-foreground">Power-user techniques: CLI shortcuts, artifact hacks, memory hygiene.</p>
            </div>
          </div>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/tips">
              View Tips
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recently Copied - client component, renders only if has items */}
      <RecentlyUsed />

      {/* Quick Start */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Start
          </CardTitle>
          <CardDescription>
            Get started in 4 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard number={1} title="Choose a solution" description="Find a prompt that addresses your creative challenge" />
            <StepCard number={2} title="Pick your AI tool" description="Claude Projects, Skills, Cowork, or Perplexity" />
            <StepCard number={3} title="Upload knowledge" description="Add briefs, brand guidelines, and references" />
            <StepCard number={4} title="Paste & go" description="Copy the prompt and start creating" />
          </ol>
        </CardContent>
      </Card>

      {/* Teams Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Browse by Department</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map(team => (
            <Link key={team.slug} href={`/team/${team.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{teamIcons[team.slug] || '📁'}</span>
                    <span className="group-hover:text-primary transition-colors">
                      {team.name}
                    </span>
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>{team.solutionCount} AI solutions</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Tool Recommendations */}
      <div>
        <h2 className="text-2xl font-bold mb-4">AI Tool Guide</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Claude Projects
              </CardTitle>
              <CardDescription>Persistent context with uploaded knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Campaign strategy and creative development</li>
                <li>Brand guidelines and tone of voice</li>
                <li>Client briefs and background materials</li>
                <li>Long-running pitch development</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Claude Skills
              </CardTitle>
              <CardDescription>Reusable workflows you can download</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Creative brief development</li>
                <li>Concept presentation formatting</li>
                <li>Copywriting and script reviews</li>
                <li>Production spec sheets</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Claude Cowork
              </CardTitle>
              <CardDescription>Desktop automation via Claude Desktop</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>File processing and asset organization</li>
                <li>Spreadsheet work and budget tracking</li>
                <li>Meeting notes and status reports</li>
                <li>+ Gemini MCP for concept visuals</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Perplexity
              </CardTitle>
              <CardDescription>Real-time web research with citations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Competitive creative analysis</li>
                <li>Cultural trends and insights</li>
                <li>Award-winning campaign research</li>
                <li>Industry news and developments</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skills Download */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Download Claude Skills
          </CardTitle>
          <CardDescription>
            Install these reusable workflows in Claude.ai: Settings → Capabilities → Upload Skill
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SkillDownload name="Brief Builder" file="brief-builder.zip" />
            <SkillDownload name="Concept Deck" file="concept-deck.zip" />
            <SkillDownload name="Creative Review" file="creative-review.zip" />
            <SkillDownload name="Script Doctor" file="script-doctor.zip" />
            <SkillDownload name="Production Specs" file="production-specs.zip" />
            <SkillDownload name="Copywriting" file="copywriting.zip" />
            <SkillDownload name="Status Report" file="status-report.zip" />
          </div>
        </CardContent>
      </Card>

      {/* Cowork Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            Cowork + Chrome + Gemini Setup
          </CardTitle>
          <CardDescription>
            Unlock desktop automation, web capture, and image generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">1. Claude Desktop</h4>
              <p className="text-sm text-muted-foreground">
                Download Claude Desktop for macOS. Cowork is available on Pro/Max plans.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://claude.com/download" target="_blank" rel="noopener noreferrer">
                  Download Claude Desktop
                </a>
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Chrome Extension</h4>
              <p className="text-sm text-muted-foreground">
                Install Claude in Chrome to let Cowork browse websites and capture references.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://claude.com/chrome" target="_blank" rel="noopener noreferrer">
                  Get Chrome Extension
                </a>
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Gemini Image MCP</h4>
              <p className="text-sm text-muted-foreground">
                Add Gemini MCP for AI concept visuals, mood boards, and storyboards.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/guinacio/claude-image-gen" target="_blank" rel="noopener noreferrer">
                  Setup Gemini MCP
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-3 bg-card border border-border/50 rounded-xl px-5 py-3 shadow-sm">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="font-semibold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
        {number}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}

function SkillDownload({ name, file }: { name: string; file: string }) {
  return (
    <a
      href={`/skills/${file}`}
      download
      className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted transition-colors"
    >
      <Download className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium">{name}</span>
    </a>
  );
}
