import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CATEGORY_LABELS, type SkillCategory } from '@/lib/skill-prompt';

interface CommunitySkill {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  downloads: number;
  created_at: string;
}

export function CommunitySkillCard({ skill }: { skill: CommunitySkill }) {
  const categoryLabel = CATEGORY_LABELS[skill.category as SkillCategory] || skill.category;
  const date = new Date(skill.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{skill.name}</CardTitle>
          <Badge variant="secondary" className="text-xs shrink-0">{categoryLabel}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{skill.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {skill.downloads} download{skill.downloads !== 1 ? 's' : ''} &middot; {date}
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={`/api/skills/community/${skill.slug}/download`}>
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
