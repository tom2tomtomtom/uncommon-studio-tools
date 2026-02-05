import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  Brain,
  Lightbulb,
  MessageSquare,
  Palette,
  Target,
  Layers,
  Sparkles,
  Users
} from 'lucide-react';

export default function AidenStudioPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/guides" className="hover:text-foreground">
          Guides
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">AIDEN Studio</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Intermediate</Badge>
          <Badge variant="outline">20 min</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AIDEN Studio</h1>
            <p className="text-muted-foreground">AI Creative Director for campaign strategy and asset creation</p>
          </div>
        </div>
      </div>

      {/* What is AIDEN */}
      <Card className="bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">What is AIDEN Studio?</p>
              <p className="text-muted-foreground mt-1">
                AIDEN Studio is an <strong>AI Creative Director</strong> that combines strategic intelligence
                with human creativity. It analyzes briefs, suggests strategic territories, proposes creative
                directions, and generates marketing assets — all through natural conversation.
                <strong> AI thinks, you decide.</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle>Core Philosophy</CardTitle>
          <CardDescription>
            Not just automation — real collaboration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <p className="font-medium">Strategic Dialogue</p>
              </div>
              <p className="text-sm text-muted-foreground">
                AIDEN challenges ideas, asks questions, and iterates on strategy through conversation
              </p>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <p className="font-medium">Creative Control</p>
              </div>
              <p className="text-sm text-muted-foreground">
                AI proposes directions while you maintain full creative control over final decisions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Key Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border">
            <p className="font-medium">Brief Analysis</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload client briefs and AIDEN extracts key objectives, target audiences,
              constraints, and opportunities automatically.
            </p>
          </div>

          <div className="p-4 rounded-lg border">
            <p className="font-medium">Strategic Territories</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suggests multiple strategic directions based on brief analysis,
              market context, and brand positioning.
            </p>
          </div>

          <div className="p-4 rounded-lg border">
            <p className="font-medium">Creative Direction</p>
            <p className="text-sm text-muted-foreground mt-1">
              Proposes visual styles, messaging frameworks, and campaign concepts
              aligned with strategic territories.
            </p>
          </div>

          <div className="p-4 rounded-lg border">
            <p className="font-medium">Asset Generation</p>
            <p className="text-sm text-muted-foreground mt-1">
              Creates marketing assets including copy, visual concepts, and
              campaign materials through iterative refinement.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Typical Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">1</span>
              <div>
                <p className="font-medium">Upload Brief</p>
                <p className="text-sm text-muted-foreground">Share client brief, brand guidelines, and reference materials</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">2</span>
              <div>
                <p className="font-medium">Strategic Discussion</p>
                <p className="text-sm text-muted-foreground">AIDEN asks clarifying questions and proposes strategic territories</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">3</span>
              <div>
                <p className="font-medium">Creative Exploration</p>
                <p className="text-sm text-muted-foreground">Explore creative directions with real-time iteration</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">4</span>
              <div>
                <p className="font-medium">Asset Creation</p>
                <p className="text-sm text-muted-foreground">Generate campaign assets with instant refinement through conversation</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">5</span>
              <div>
                <p className="font-medium">Export & Deliver</p>
                <p className="text-sm text-muted-foreground">Export final assets for production and client presentation</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Use Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Campaign Strategy</p>
              <p className="text-xs text-muted-foreground">Develop positioning and messaging frameworks</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Creative Concepting</p>
              <p className="text-xs text-muted-foreground">Generate and refine campaign concepts</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Pitch Development</p>
              <p className="text-xs text-muted-foreground">Create compelling pitch materials</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Content Creation</p>
              <p className="text-xs text-muted-foreground">Generate copy and visual assets</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Brand Development</p>
              <p className="text-xs text-muted-foreground">Explore brand territories and visual identity</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Rapid Prototyping</p>
              <p className="text-xs text-muted-foreground">Quick visualization of creative ideas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-semibold shrink-0">1</span>
              <div>
                <p className="font-medium">Provide Rich Context</p>
                <p className="text-sm text-muted-foreground">Upload brand guidelines, past campaigns, and competitor references</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-semibold shrink-0">2</span>
              <div>
                <p className="font-medium">Engage in Dialogue</p>
                <p className="text-sm text-muted-foreground">Don't just accept first outputs — push back, ask questions, iterate</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-semibold shrink-0">3</span>
              <div>
                <p className="font-medium">Use as a Starting Point</p>
                <p className="text-sm text-muted-foreground">AIDEN accelerates ideation — refine outputs with human creativity</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs font-semibold shrink-0">4</span>
              <div>
                <p className="font-medium">Specify Constraints</p>
                <p className="text-sm text-muted-foreground">Be clear about budget, timeline, brand rules, and audience</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Need to create presentations from campaigns?</h3>
              <p className="text-sm text-muted-foreground">
                Use Gamma to turn strategy into polished decks.
              </p>
            </div>
            <Link
              href="/guides/gamma"
              className="flex items-center gap-1 text-primary hover:underline font-medium"
            >
              Gamma Guide
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
