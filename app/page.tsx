import { teams, prompts } from '@/lib/prompts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecentlyUsed } from '@/components/recently-used';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Users, FileText, Download, Monitor, Globe, Image, GraduationCap } from 'lucide-react';
import { teamIcons } from '@/lib/constants';

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
          {totalPrompts} prompts, 33 skills, and 13 plugins across {totalTeams} agency departments
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <StatCard icon={<FileText className="h-5 w-5" />} label="Prompts" value={totalPrompts} />
          <StatCard icon={<Sparkles className="h-5 w-5" />} label="Skills" value={33} />
          <StatCard icon={<Zap className="h-5 w-5" />} label="Plugins" value={13} />
          <StatCard icon={<Users className="h-5 w-5" />} label="Departments" value={totalTeams} />
        </div>
      </div>

      {/* Getting Started Banner */}
      <Link href="/guides/getting-started">
        <Card className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-background hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group border-emerald-500/20">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">New to Claude? Start here</h3>
                  <p className="text-sm text-muted-foreground">
                    Login, connect Gmail &amp; Calendar, learn the modes, and try your first prompts — 15 min guide
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </CardContent>
        </Card>
      </Link>

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
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{teamIcons[team.slug] || '📁'}</span>
                    <span className="group-hover:text-primary transition-colors">
                      {team.name}
                    </span>
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>{team.solutionCount} prompts</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
              <CardDescription className="text-base">Upload once, Claude remembers everything across conversations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it does for you:</strong> Upload your client briefs, brand guidelines, and references once — Claude remembers everything across conversations so you never re-explain context. Every conversation starts with Claude already knowing the brand inside-out.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">How to use it:</strong> Create a Project for each major client or campaign. Upload their brand book, tone of voice guide, past creative work, and any briefs. Ask it to write copy, develop concepts, or review work — all in the client's voice, every time.
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
              <CardDescription className="text-base">Install a skill once and Claude follows the same process every time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it does for you:</strong> Install a skill once and Claude knows how to write press releases, review creative briefs, or build pitch decks — the same way, every time. Think of skills as "apps" that teach Claude your exact process.
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
              <CardDescription className="text-base">Tell Claude what you need done and watch it work on your actual computer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it does for you:</strong> Tell Claude what you need done and watch it work — it opens apps, moves files, fills spreadsheets, and creates documents on your actual computer. It handles the repetitive tasks so you can focus on the creative ones.
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
              <CardDescription className="text-base">Get research answers with clickable sources you can verify</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">What it does for you:</strong> Get research answers with clickable sources — competitive analysis, trend reports, and fact-checking backed by real citations you can verify. Unlike Claude (which has a knowledge cutoff), Perplexity knows what happened yesterday.
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
            33 reusable workflows — install in Claude.ai: Settings → Capabilities → Upload Skill
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Strategy & Research */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Strategy & Research</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SkillDownload name="Brand Positioning" file="brand-positioning.zip" description="Run positioning workshops with messaging hierarchies" />
              <SkillDownload name="Strategy Brief Builder" file="strategy-brief-builder.zip" description="Build comms strategy briefs from loose inputs" />
              <SkillDownload name="Competitor Analysis" file="competitor-analysis.zip" description="Deep-dive a specific competitor's positioning and strategy" />
              <SkillDownload name="Competitor Research" file="competitor-research.zip" description="Benchmark your product and get improvement recommendations" />
              <SkillDownload name="Category Scanner" file="competitor-category-scanner.zip" description="Map competitive landscapes and identify positioning gaps" />
              <SkillDownload name="Audience & Culture" file="audience-cultural-insight.zip" description="Research audiences with demographic and cultural analysis" />
              <SkillDownload name="RFP Assessment" file="rfp-assessment-v2.zip" description="Evaluate RFP opportunities with strategic go/no-go scoring" />
            </div>
          </div>

          {/* Content & Copy */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Content & Copy</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SkillDownload name="Copywriting" file="copywriting.zip" description="Write on-brand copy for ads, emails, social, and web" />
              <SkillDownload name="Content Transformer" file="content-transformer.zip" description="Repurpose one piece into LinkedIn, email, social, and blog formats" />
              <SkillDownload name="Social Copy Writer" file="social-copy-writer.zip" description="Platform-specific social posts with tone and hashtag calibration" />
              <SkillDownload name="Content Calendar" file="content-calendar-generator.zip" description="Generate editorial calendars with tentpole mapping" />
              <SkillDownload name="Brand Voice Enforcer" file="brand-voice-enforcer.zip" description="Check copy against brand guidelines for tone and terminology" />
              <SkillDownload name="Talking Points" file="talking-points.zip" description="Spokesperson key messages with bridge phrases and Q&A" />
            </div>
          </div>

          {/* Media & PR */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Media & PR</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SkillDownload name="Media Release Writer" file="media-release-writer.zip" description="Draft press releases with proper structure and quote formatting" />
              <SkillDownload name="Media Pitch Crafter" file="media-pitch-crafter.zip" description="Craft journalist pitches with strong angles and subject lines" />
              <SkillDownload name="Media List Intelligence" file="media-list-intelligence.zip" description="Research journalists and prioritize contacts for stories" />
              <SkillDownload name="Coverage Report" file="coverage-report-builder.zip" description="Build media coverage reports with sentiment and share of voice" />
              <SkillDownload name="Crisis Comms Drafter" file="crisis-comms-drafter.zip" description="Draft holding statements and stakeholder messaging for incidents" />
            </div>
          </div>

          {/* Creative & Production */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Creative & Production</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SkillDownload name="Creative Review" file="creative-review.zip" description="Score creative work against briefs with structured feedback" />
              <SkillDownload name="Design Critique" file="design-critique.zip" description="Structured design feedback on hierarchy, typography, and accessibility" />
              <SkillDownload name="Production Specs" file="production-specs.zip" description="Generate spec sheets with formats, dimensions, and delivery requirements" />
              <SkillDownload name="Event & Launch Planner" file="event-launch-planner.zip" description="Create run sheets, logistics checklists, and launch timelines" />
            </div>
          </div>

          {/* Account & Operations */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Account & Operations</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SkillDownload name="Client Comms Writer" file="client-comms-writer.zip" description="Draft status reports, WIP updates, and recap emails" />
              <SkillDownload name="Client Management" file="client-management.zip" description="Assess relationship health with scorecards and growth strategies" />
              <SkillDownload name="Meeting Notes" file="meeting-notes-actions.zip" description="Structured summaries with action items, owners, and deadlines" />
              <SkillDownload name="Stakeholder Update" file="stakeholder-update.zip" description="RAG-rated status reports with milestones and risk flags" />
              <SkillDownload name="Email Drafter" file="email-drafter.zip" description="Professional emails for pitching, follow-ups, and introductions" />
              <SkillDownload name="Executive Comms" file="executive-comms.zip" description="Leadership emails, board updates, and company announcements" />
              <SkillDownload name="Process Docs" file="process-docs.zip" description="Standardized SOPs and workflow guides with versioning" />
              <SkillDownload name="Digital Analytics" file="digital-analytics.zip" description="Performance reports with KPI dashboards and recommendations" />
              <SkillDownload name="QA Testing" file="qa-testing.zip" description="QA reports with severity ratings and acceptance criteria" />
            </div>
          </div>

          {/* New Business */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">New Business</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <SkillDownload name="Proposal Writer" file="new-business-proposal-writer.zip" description="Write proposals, pitch decks, and capability statements" />
              <SkillDownload name="Pitch/RFP Reviewer" file="pitch-rfp-reviewer.zip" description="Evaluate submissions for gaps and improvement opportunities" />
            </div>
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
    <div className="flex items-center gap-3 bg-card border border-border/50 rounded-xl px-5 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
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

function SkillDownload({ name, file, description }: { name: string; file: string; description?: string }) {
  return (
    <a
      href={`/skills/${file}`}
      download
      className="flex items-start gap-2 p-3 rounded-lg border hover:bg-muted hover:shadow-sm hover:border-primary/30 transition-all duration-200"
    >
      <Download className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <div>
        <span className="text-sm font-medium">{name}</span>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </a>
  );
}
