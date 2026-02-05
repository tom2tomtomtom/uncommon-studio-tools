import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  Terminal,
  Lightbulb,
  FileQuestion,
  Wrench,
  GitBranch,
  Zap
} from 'lucide-react';

export default function ClaudeCodePage() {
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
        <span className="text-foreground">Claude Code</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Beginner</Badge>
          <Badge variant="outline">15 min</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <Terminal className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Claude Code for Non-Coders</h1>
            <p className="text-muted-foreground">Use the command-line to manage projects with plain English</p>
          </div>
        </div>
      </div>

      {/* Concept */}
      <Card className="bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">The Key Insight</p>
              <p className="text-muted-foreground mt-1">
                Despite its name, <strong>Claude Code</strong> is arguably more powerful for non-coders than experts
                because it removes the barrier of knowing syntax. Think of it as an autonomous employee who lives
                in your computer. You don't need to know Python or JavaScript—just give instructions in plain English.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">1</span>
            The Setup (One-Time Only)
          </CardTitle>
          <CardDescription>
            You only need to use the terminal once to install Claude Code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Mac Users</h4>
            <p className="text-sm text-muted-foreground mb-2">Open "Terminal" and paste this line:</p>
            <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-sm font-mono">
              curl -fsSL https://claude.ai/install.sh | bash
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">Windows Users</h4>
            <p className="text-sm text-muted-foreground mb-2">Open "PowerShell" and paste this line:</p>
            <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-sm font-mono">
              irm https://claude.ai/install.ps1 | iex
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">Login</h4>
            <p className="text-sm text-muted-foreground">
              Type <code className="bg-muted px-1 rounded">claude</code> and hit Enter.
              It will ask you to log in—press Enter to open your browser and authenticate with your Pro/Team account.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Workflow 1 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-primary" />
            Workflow 1: "What Am I Looking At?"
          </CardTitle>
          <CardDescription>
            Understand any project you download or receive from a developer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Navigate to the Project</h4>
            <p className="text-sm text-muted-foreground">
              Type <code className="bg-muted px-1 rounded">cd</code> followed by a space,
              then <strong>drag the project folder</strong> into the terminal window and hit Enter.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Start the Agent</h4>
            <pre className="bg-muted p-3 rounded-lg text-sm font-mono">claude</pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">What to Ask</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <code className="bg-muted px-2 py-1 rounded text-sm shrink-0">"What does this project do?"</code>
                <p className="text-sm text-muted-foreground">Claude reads the files and summarizes the project's purpose</p>
              </div>
              <div className="flex gap-3 items-start">
                <code className="bg-muted px-2 py-1 rounded text-sm shrink-0">"Explain the folder structure"</code>
                <p className="text-sm text-muted-foreground">It tells you which files are important and which are clutter</p>
              </div>
              <div className="flex gap-3 items-start">
                <code className="bg-muted px-2 py-1 rounded text-sm shrink-0">"How do I run this?"</code>
                <p className="text-sm text-muted-foreground">It reads the documentation and tells you the exact command</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow 2 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Workflow 2: The "Fix It" Button
          </CardTitle>
          <CardDescription>
            Fix bugs without hunting through files yourself
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You encounter a bug or error message. A coder would hunt through files to find the missing semicolon.
            You just tell Claude the symptoms.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">1</span>
              <p className="text-sm">Copy the error message you see</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">2</span>
              <div>
                <p className="text-sm">Paste it into Claude Code:</p>
                <code className="bg-muted px-2 py-1 rounded text-sm mt-1 inline-block">"I am getting this error: [paste error]. Fix it."</code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">3</span>
              <p className="text-sm">Claude locates the file, writes the fix, shows you the change, and asks "Do you want to apply this?"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0">4</span>
              <p className="text-sm">Type "Yes" and the code is fixed without you opening a single file</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow 3 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Workflow 3: Git for People Who Hate Git
          </CardTitle>
          <CardDescription>
            Save your work without memorizing cryptic commands
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            "Git" is a version control system for saving code history. It's notoriously difficult for beginners.
            Claude Code automates it entirely.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Reviewing Work</h4>
              <p className="text-sm text-muted-foreground">
                Ask <code className="bg-muted px-1 rounded">"What files have I changed?"</code> to see a summary of your work session.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-1">Saving Work</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Instead of memorizing <code className="bg-muted px-1 rounded">git add</code> and <code className="bg-muted px-1 rounded">git commit</code>, just type:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-sm font-mono">claude commit</pre>
            </div>

            <div>
              <h4 className="font-medium mb-1">The Result</h4>
              <p className="text-sm text-muted-foreground">
                Claude looks at your changes, writes a professional description (e.g., "Refactored login logic and fixed typo in header"),
                and saves it to the history.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Pro Tip: The "One-Shot" Command
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You don't always need a full conversation. If you just need a quick answer, use the <code className="bg-muted px-1 rounded">-p</code> (print) flag:
          </p>
          <pre className="bg-muted p-3 rounded-lg text-sm font-mono overflow-x-auto">
            claude -p "Where is the password saved in this project?"
          </pre>
          <p className="text-sm text-muted-foreground">
            Claude will search the files, print the answer, and exit immediately.
          </p>
        </CardContent>
      </Card>

      {/* Cheat Sheet */}
      <Card>
        <CardHeader>
          <CardTitle>The Non-Coder's Cheat Sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Goal</th>
                  <th className="text-left py-2 font-medium">What You Type</th>
                  <th className="text-left py-2 font-medium">What Claude Does</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 font-medium">Start</td>
                  <td className="py-2"><code className="bg-muted px-1 rounded">claude</code></td>
                  <td className="py-2 text-muted-foreground">Wakes up the agent</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Understand</td>
                  <td className="py-2"><code className="bg-muted px-1 rounded">explain this project</code></td>
                  <td className="py-2 text-muted-foreground">Reads all files and summarizes them</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Fix</td>
                  <td className="py-2"><code className="bg-muted px-1 rounded">fix the bug where [X] happens</code></td>
                  <td className="py-2 text-muted-foreground">Finds the code, writes the fix, edits the file</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Save</td>
                  <td className="py-2"><code className="bg-muted px-1 rounded">claude commit</code></td>
                  <td className="py-2 text-muted-foreground">Saves work with a generated description</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Quit</td>
                  <td className="py-2"><code className="bg-muted px-1 rounded">/exit</code></td>
                  <td className="py-2 text-muted-foreground">Closes the session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Ready for autonomous tasks?</h3>
              <p className="text-sm text-muted-foreground">
                Learn how Cowork lets Claude execute multi-step jobs in the background.
              </p>
            </div>
            <Link
              href="/guides/cowork"
              className="flex items-center gap-1 text-primary hover:underline font-medium"
            >
              Cowork Guide
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
