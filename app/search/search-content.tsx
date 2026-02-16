'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { prompts, teams } from '@/lib/prompts';
import { PromptCard } from '@/components/prompt-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/use-analytics';
import { Search, X, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const fuse = new Fuse(prompts, {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'description', weight: 1.5 },
    { name: 'teamName', weight: 1 },
    { name: 'prompt', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(searchParams.get('team') || null);
  const { track } = useAnalytics();

  // Sync state to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedTeam) params.set('team', selectedTeam);
    const newUrl = params.toString() ? `?${params.toString()}` : '/search';
    router.replace(newUrl, { scroll: false });
  }, [query, selectedTeam, router]);

  const results = useMemo(() => {
    let items = query.length > 1
      ? fuse.search(query).map(r => r.item)
      : prompts;

    if (selectedTeam) {
      items = items.filter(p => p.teamSlug === selectedTeam);
    }

    return items;
  }, [query, selectedTeam]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      track({ type: 'search', query: value, resultCount: fuse.search(value).length });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground flex items-center gap-1">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Search</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Search All Prompts</h1>
        <p className="text-muted-foreground mt-2">
          Find the right prompt across {prompts.length} tools and {teams.length} departments
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, department, or keyword..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
          aria-label="Search prompts"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Department Filter */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by department">
        <Button
          variant={selectedTeam === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedTeam(null)}
          aria-pressed={selectedTeam === null}
        >
          All Departments
        </Button>
        {teams.map(team => (
          <Button
            key={team.slug}
            variant={selectedTeam === team.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTeam(team.slug === selectedTeam ? null : team.slug)}
            aria-pressed={selectedTeam === team.slug}
          >
            {team.name.replace(' Team', '')}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      {(query || selectedTeam) && (
        <div className="text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? 'result' : 'results'}
          {query && ` for "${query}"`}
          {selectedTeam && ` in ${teams.find(t => t.slug === selectedTeam)?.name}`}
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        {results.length === 0 && (query || selectedTeam) ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No matching prompts</h3>
            <p className="text-muted-foreground mt-1">
              Try a different keyword, remove the department filter, or{' '}
              <button
                onClick={() => { setQuery(''); setSelectedTeam(null); }}
                className="text-primary hover:underline font-medium"
              >
                clear all filters
              </button>{' '}
              to browse everything.
            </p>
          </div>
        ) : !query && !selectedTeam ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Start typing to search, or browse by department:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {teams.map(team => (
                <button
                  key={team.slug}
                  onClick={() => setSelectedTeam(team.slug)}
                  className="flex flex-col items-start gap-1 p-4 rounded-lg border hover:border-primary hover:bg-accent/50 transition-colors text-left"
                >
                  <span className="font-medium text-sm">{team.name.replace(' Team', '')}</span>
                  <span className="text-xs text-muted-foreground">{team.solutionCount} prompts</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          results.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))
        )}
      </div>
    </div>
  );
}
