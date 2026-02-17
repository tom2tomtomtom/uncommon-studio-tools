'use client';

import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function SkillInfo({ name, slug, description }: { name: string; slug: string; description?: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`Use the ${slug} skill`);
    toast.success('Copied to clipboard');
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-start gap-2 p-3 rounded-lg border hover:bg-muted hover:shadow-sm hover:border-primary/30 transition-all duration-200 text-left w-full group"
      title="Click to copy invocation"
    >
      <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <div className="min-w-0">
        <span className="text-sm font-medium">{name}</span>
        <p className="text-xs font-mono text-primary/70 mt-0.5">{slug}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </button>
  );
}
