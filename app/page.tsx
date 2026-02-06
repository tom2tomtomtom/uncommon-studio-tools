import { teams, prompts } from '@/lib/prompts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecentlyUsed } from '@/components/recently-used';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Users, FileText, Download, Monitor, Globe, Image } from 'lucide-react';

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
          {totalPrompts} AI prompts across {totalTeams} agency departments — ready to copy and paste
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <StatCard icon={<FileText className="h-5 w-5" />} label="Prompts" value={totalPrompts} />
          <StatCard icon={<Users className="h-5 w-5" />} label="Departments" value={totalTeams} />
          <StatCard icon={<Zap className="h-5 w-5" />} label="AI Tools" value={4} />
        </div>
      </div>

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
            <StepCard number={2} title="Pick your AI tool" description="Claude Projects, Claude Skills, Cowork, or Perplexity" />
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
                    <span>{team.solutionCount} prompts</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Tool Recommendations */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">AI Tool Guide</h2>
          <p className="text-muted-foreground">Four tools for different tasks. Choose based on what you need to accomplish.</p>
        </div>

        <div className="grid gap-6">
          {/* Claude Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Claude Projects
              </CardTitle>
              <CardDescription className="text-base">Your AI creative partner with a perfect memory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it is:</strong> A dedicated workspace in Claude where you upload documents once and they persist across conversations. Claude remembers everything you've shared — brand guidelines, past campaigns, client history — so you never have to re-explain context.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">How to use it:</strong> Create a Project for each major client or campaign. Upload their brand book, tone of voice guide, past creative work, and any briefs. Now every conversation starts with Claude already knowing the brand inside-out. Ask it to write copy, develop concepts, or review work—all in the client's voice.
              </p>
              <div className="pt-2 border-t">
                <p className="text-xs font-medium text-foreground mb-2">Best for:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Campaign strategy</Badge>
                  <Badge variant="secondary">Long-running pitches</Badge>
                  <Badge variant="secondary">Brand-consistent copy</Badge>
                  <Badge variant="secondary">Creative development</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claude Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Claude Skills
              </CardTitle>
              <CardDescription className="text-base">Pre-built workflows you install once and reuse anytime</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it is:</strong> Downloadable instruction sets that teach Claude how to perform specific tasks. Think of them as "apps" for Claude — install a Creative Brief skill, and Claude knows exactly how to structure briefs, what questions to ask, and what format to output.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">How to use it:</strong> Download a .zip file from this site, go to Claude.ai → Settings → Capabilities → Upload Skill. Once installed, just tell Claude to use that skill: "Use the Creative Brief skill to write a brief for this campaign." The skill stays in your account until you remove it.
              </p>
              <div className="pt-2 border-t">
                <p className="text-xs font-medium text-foreground mb-2">Best for:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Repeatable formats</Badge>
                  <Badge variant="secondary">QA & review processes</Badge>
                  <Badge variant="secondary">Document templates</Badge>
                  <Badge variant="secondary">Team standardization</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claude Cowork */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Monitor className="h-6 w-6 text-primary" />
                Claude Cowork
              </CardTitle>
              <CardDescription className="text-base">An AI assistant that works directly on your computer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it is:</strong> A feature in Claude Desktop that lets Claude see your screen, control your mouse and keyboard, open apps, and work with files on your computer. It handles the repetitive tasks so you can focus on the creative ones.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">How to use it:</strong> Download Claude Desktop (Pro/Max required). Open Cowork mode and describe what you need: "Organize these 50 campaign assets into folders by client" or "Turn these meeting notes into a status report in Google Docs." Add the Chrome extension for web tasks, or Gemini MCP for AI image generation.
              </p>
              <div className="pt-2 border-t">
                <p className="text-xs font-medium text-foreground mb-2">Best for:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">File organization</Badge>
                  <Badge variant="secondary">Spreadsheet work</Badge>
                  <Badge variant="secondary">Document creation</Badge>
                  <Badge variant="secondary">Repetitive tasks</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Perplexity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Perplexity Pro
              </CardTitle>
              <CardDescription className="text-base">Real-time research that actually cites its sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it is:</strong> An AI search engine that reads the internet in real-time and gives you synthesized answers with clickable citations. Unlike Claude (which has a knowledge cutoff), Perplexity knows what happened yesterday. Every claim links to its source so you can verify.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">How to use it:</strong> Use Pro Search for deep research — it reads 10x more sources and shows its reasoning. Ask specific questions: "What campaigns won Cannes Lions for sustainability in 2025?" or "What's Nike's current brand positioning vs Adidas?" Export findings as Markdown for your decks.
              </p>
              <div className="pt-2 border-t">
                <p className="text-xs font-medium text-foreground mb-2">Best for:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Competitive analysis</Badge>
                  <Badge variant="secondary">Cultural trends</Badge>
                  <Badge variant="secondary">Award research</Badge>
                  <Badge variant="secondary">Fact-checking</Badge>
                </div>
              </div>
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
