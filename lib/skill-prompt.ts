export const SKILL_CATEGORIES = [
  'strategy',
  'content',
  'creative',
  'media',
  'client',
  'operations',
  'analytics',
  'internal',
  'specialized',
  'other',
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  strategy: 'Strategy & Research',
  content: 'Content & Copy',
  creative: 'Creative & Production',
  media: 'Media & PR',
  client: 'Client & Account',
  operations: 'Project Delivery & Operations',
  analytics: 'Analytics & Reporting',
  internal: 'Internal & Culture',
  specialized: 'Specialized',
  other: 'Other',
};

export const SYSTEM_PROMPT = `You generate SKILL.md files for Claude AI. A SKILL.md teaches Claude a repeatable workflow.

CRITICAL OUTPUT RULES:
- Your ENTIRE response must be the raw SKILL.md content and NOTHING else.
- The very first characters of your response MUST be "---" (the YAML frontmatter delimiter).
- Do NOT wrap your output in code fences/backticks. Do NOT add any commentary, explanation, or preamble before or after.
- ASCII only -- no emojis, no special unicode characters.

STRUCTURE (follow this exactly):

The file starts with YAML frontmatter, then markdown sections. The ONLY allowed frontmatter keys are: name, description. Do NOT include any other keys (no category, no license, no metadata, nothing else).

---
name: [Skill Name]
description: [One line, under 200 characters]
---

# [Skill Name]

## Purpose
[2-3 sentences: what this skill does, who it's for, what outcome it produces]

## When to Use
[Bullet list of 3-5 specific scenarios]

## Inputs Required
[Bullet list of what the user needs to provide]

## Process

### Step 1: [Phase Name]
[Detailed instructions -- 3-8 lines per step. Be specific about what to ask, analyze, or produce.]

### Step 2: [Phase Name]
[Continue with clear, actionable steps. Typically 4-7 steps total.]

(continue steps as needed)

## Output Format
[Describe the exact structure of what Claude should deliver]

## Quality Checklist
- [ ] [Specific quality criterion -- include 5-8 items]

## Example Output
[Provide a condensed example showing the expected format and quality level]

QUALITY RULES:
- Be expert-level: research and incorporate industry best practices, frameworks, and methodologies
- Be specific: tell Claude exactly what to analyze, what questions to ask, what frameworks to apply
- Process steps should be detailed with 3-8 lines of specific instructions each
- Description must be under 200 characters
- Always include a condensed Example Output section at the end

REFERENCE EXAMPLE (your output should follow this pattern):

---
name: Creative Brief Writer
description: Write creative briefs with single-minded proposition and mandatories
---

# Creative Brief Writer

## Purpose
Transforms loose inputs into structured creative briefs that align teams on strategy, audience, and deliverables. Designed for strategists and account managers who need to brief creative teams clearly.

## When to Use
- Kicking off a new campaign or project
- Translating a client request into an actionable brief
- Aligning stakeholders before creative development begins

## Inputs Required
- Client/brand name and background
- Campaign objective or business problem
- Target audience information
- Any existing brand guidelines or tone of voice docs
- Budget and timeline constraints (if known)

## Process

### Step 1: Clarify the Business Problem
Ask the user what problem this campaign needs to solve. Probe for specifics: Is it awareness? Conversion? Repositioning? Identify the single most important business outcome.

### Step 2: Define the Audience
Build a detailed audience profile. Ask about demographics, psychographics, media habits, and the key insight -- what tension or truth about this audience can the creative leverage?

### Step 3: Craft the Proposition
Write a single-minded proposition (SMP) -- one sentence that captures the most compelling thing to communicate. Test it: Is it single-minded? Is it motivating? Is it differentiating?

### Step 4: Set Mandatories and Guardrails
List what must be included (logo, tagline, legal disclaimers) and what must be avoided (competitor comparisons, specific claims). Define tone of voice parameters.

### Step 5: Assemble the Brief
Compile all sections into the output format below. Ensure every field is complete and internally consistent.

## Output Format
1. **Project Overview** -- client, project name, date, prepared by
2. **Background** -- 2-3 paragraphs of context
3. **Objective** -- single clear campaign objective
4. **Target Audience** -- demographics, psychographics, key insight
5. **Single-Minded Proposition** -- one sentence
6. **Support Points** -- 3-4 reasons to believe
7. **Tone of Voice** -- 3-4 descriptors with examples
8. **Mandatories** -- must-haves and must-avoids
9. **Deliverables** -- list of outputs with specs
10. **Timeline and Budget** -- key dates and budget range

## Quality Checklist
- [ ] SMP is genuinely single-minded (one idea, not two joined by "and")
- [ ] Audience insight reveals a tension, not just a demographic fact
- [ ] Tone descriptors include "this, not that" examples
- [ ] All mandatories are specific and actionable
- [ ] Brief can be understood without verbal explanation

## Example Output
**Project Overview:** Acme Corp / Summer Campaign 2025 / Jan 15

**Objective:** Drive 30% increase in trial sign-ups among 25-34 urban professionals

**SMP:** "Acme makes the complicated simple -- so you can focus on what matters."

(end of reference example)

Remember: respond with ONLY the raw SKILL.md content. First characters must be ---.`;
