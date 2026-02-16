export const revalidate = 3600;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  Search,
  Lightbulb,
  Zap,
  FolderOpen,
  Upload,
  Globe,
  Code
} from 'lucide-react';

export default function PerplexityPage() {
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
        <span className="text-foreground">Perplexity AI</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Beginner</Badge>
          <Badge variant="outline">20 min</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Perplexity AI</h1>
            <p className="text-muted-foreground">The AI-powered answer engine with real-time citations</p>
          </div>
        </div>
      </div>

      {/* What is Perplexity */}
      <Card className="bg-gradient-to-r from-teal-500/5 via-teal-500/10 to-teal-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">What is Perplexity?</p>
              <p className="text-muted-foreground mt-1">
                Perplexity is an AI-powered answer engine that combines conversational AI
                with real-time web search. Every answer includes <strong>inline citations</strong> so you can verify sources.
                Think of it as "Google meets Claude" — you get direct answers, not just links.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Modes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Search Modes
          </CardTitle>
          <CardDescription>
            Choose the right mode for your research depth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border">
              <p className="font-medium">Quick Search</p>
              <p className="text-sm text-muted-foreground mt-1">
                Fast answers for simple questions. Uses fewer sources and provides concise responses.
                Best for quick fact checks or definitions.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-primary/50 bg-primary/5">
              <p className="font-medium">Pro Search</p>
              <p className="text-sm text-muted-foreground mt-1">
                Multi-step reasoning with deeper analysis. Searches more sources, asks clarifying questions,
                and provides comprehensive answers. Best for research and complex topics.
              </p>
            </div>

            <div className="p-4 rounded-lg border">
              <p className="font-medium">Reasoning Search</p>
              <p className="text-sm text-muted-foreground mt-1">
                Shows Claude's step-by-step thinking process. Best for math, logic problems,
                and understanding how the AI reaches conclusions.
              </p>
            </div>

            <div className="p-4 rounded-lg border">
              <p className="font-medium">Research Mode</p>
              <p className="text-sm text-muted-foreground mt-1">
                Deep-dive research that creates a structured report. Searches extensively,
                synthesizes findings, and organizes into sections. Best for academic research or reports.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Focus Modes */}
      <Card>
        <CardHeader>
          <CardTitle>Focus Modes</CardTitle>
          <CardDescription>
            Narrow your search to specific source types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">All</p>
              <p className="text-xs text-muted-foreground">Search the entire web (default)</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Academic</p>
              <p className="text-xs text-muted-foreground">Peer-reviewed papers and journals</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Writing</p>
              <p className="text-xs text-muted-foreground">No web search — pure AI writing assistant</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Math</p>
              <p className="text-xs text-muted-foreground">Step-by-step problem solving</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Video</p>
              <p className="text-xs text-muted-foreground">Search YouTube and video content</p>
            </div>
            <div className="p-3 rounded-lg border">
              <p className="font-medium text-sm">Social</p>
              <p className="text-xs text-muted-foreground">Reddit, X, and social discussions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spaces */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Spaces (Collections)
          </CardTitle>
          <CardDescription>
            Organize research by project, topic, or client
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Spaces are project folders that keep your searches organized and enable collaboration.
            Every search can be saved to a Space, creating a searchable archive you can return to later.
          </p>

          <div>
            <p className="font-medium mb-2">How to Create a Space</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Click the <strong>Spaces</strong> icon in the left sidebar</li>
              <li>Click <strong>Create new Space</strong></li>
              <li>Enter a title and optional description</li>
              <li>Add custom instructions (tone, formatting preferences)</li>
            </ol>
          </div>

          <div>
            <p className="font-medium mb-2">Space Features</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Group threads by project or topic</li>
              <li>Upload files (PDFs, Word, Excel, PowerPoint, images)</li>
              <li>Invite collaborators as viewers or "research partners"</li>
              <li>Set custom AI instructions that apply to all searches</li>
              <li>Connect organizational file repositories (Enterprise)</li>
            </ul>
          </div>

        </CardContent>
      </Card>

      {/* File Uploads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            File Uploads & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Upload files directly to analyze with AI. Perplexity can extract insights,
            summarize content, and answer questions about your documents.
          </p>

          <div>
            <p className="font-medium mb-2">Supported Formats</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="p-2 rounded border text-sm">PDFs</div>
              <div className="p-2 rounded border text-sm">Word (.docx)</div>
              <div className="p-2 rounded border text-sm">Excel (.xlsx)</div>
              <div className="p-2 rounded border text-sm">PowerPoint (.pptx)</div>
              <div className="p-2 rounded border text-sm">CSV files</div>
              <div className="p-2 rounded border text-sm">Images</div>
              <div className="p-2 rounded border text-sm">Audio files</div>
              <div className="p-2 rounded border text-sm">Video files</div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm">
              <strong>Pro tip:</strong> Upload spreadsheets or slide decks to quickly extract key data points
              or get a summary without reading through everything.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Perplexity Pages
          </CardTitle>
          <CardDescription>
            Transform research into shareable, published articles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Pages lets you convert your research into polished, publishable articles.
            These pages are indexed by Google and can be shared publicly.
          </p>

          <div>
            <p className="font-medium mb-2">Creating a Page</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Go to the Library section</li>
              <li>Click <strong>Create a Page</strong></li>
              <li>Enter your topic and select audience (beginner, advanced, or anyone)</li>
              <li>In ~30 seconds, Perplexity generates a structured article</li>
              <li>Edit content, add sections, include media</li>
              <li>Click <strong>Publish</strong> and share the link</li>
            </ol>
          </div>

          <div className="p-3 rounded-lg bg-muted">
            <p className="text-sm">
              <strong>Use case:</strong> Create internal knowledge base articles, client research summaries,
              or educational content without starting from scratch.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Sonar API
          </CardTitle>
          <CardDescription>
            Embed AI-powered search with citations into your own apps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The Sonar API lets you add Perplexity's citation-backed search to your own applications.
          </p>

          <div>
            <p className="font-medium mb-2">API Capabilities</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Real-time web search with citations</li>
              <li>Access to Sonar models</li>
              <li>Structured responses with source links</li>
              <li>Build research tools, chatbots, or content generators</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">1</span>
            <div>
              <p className="font-medium">Use Pro Search for research, Quick for facts</p>
              <p className="text-sm text-muted-foreground">Save your Pro searches for complex topics. Quick search is often enough for simple lookups.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">2</span>
            <div>
              <p className="font-medium">Set recency filters for current events</p>
              <p className="text-sm text-muted-foreground">Filter to "Past 24 hours" or "Past week" when you need the latest information.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">3</span>
            <div>
              <p className="font-medium">Use Academic focus for citations</p>
              <p className="text-sm text-muted-foreground">When you need peer-reviewed sources for papers or presentations, switch to Academic focus.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">4</span>
            <div>
              <p className="font-medium">Upload competitor materials to Spaces</p>
              <p className="text-sm text-muted-foreground">Create a competitive analysis Space with uploaded PDFs, then ask questions across all documents.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Want to organize knowledge differently?</h3>
              <p className="text-sm text-muted-foreground">
                Check out NotebookLM for source-based research with Audio Overviews.
              </p>
            </div>
            <Link
              href="/guides/notebooklm"
              className="flex items-center gap-1 text-primary hover:underline font-medium"
            >
              NotebookLM Guide
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
