'use client';

import { Sparkles, Download } from 'lucide-react';
import { toast } from 'sonner';

export function SkillInfo({ name, slug, description, preloaded = true }: { name: string; slug: string; description?: string; preloaded?: boolean }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`Use the ${slug} skill`);
    toast.success('Copied to clipboard');
  };

  if (!preloaded) {
    return (
      <a
        href={`/skills/${slug}.zip`}
        download
        className="flex items-start gap-2 p-3 rounded-lg border hover:bg-muted hover:shadow-sm hover:border-primary/30 transition-all duration-200 text-left w-full group"
        title="Click to download skill ZIP"
      >
        <Download className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="min-w-0">
          <span className="text-sm font-medium">{name}</span>
          <p className="text-xs font-mono text-primary/70 mt-0.5">{slug}</p>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          <p className="text-xs text-primary/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to download skill ZIP</p>
        </div>
      </a>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-start gap-2 p-3 rounded-lg border hover:bg-muted hover:shadow-sm hover:border-primary/30 transition-all duration-200 text-left w-full group"
      title="Click to copy, then paste in Claude"
    >
      <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <div className="min-w-0">
        <span className="text-sm font-medium">{name}</span>
        <p className="text-xs font-mono text-primary/70 mt-0.5">{slug}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        <p className="text-xs text-primary/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to copy, then paste in Claude</p>
      </div>
    </button>
  );
}
