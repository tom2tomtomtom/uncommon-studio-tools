// Maps team slugs to their guide markdown filenames
export const teamGuideFiles: Record<string, string> = {
  'creative': 'Guide_Creative.md',
  'account-management': 'Guide_Account_Management.md',
  'production': 'Guide_Production.md',
  'design': 'Guide_Design.md',
  'digital': 'Guide_Digital.md',
  'copywriting': 'Guide_Copywriting.md',
  'new-business': 'Guide_New_Business.md',
  'project-management': 'Guide_Project_Management.md',
};

// Guide metadata for display
export const teamGuideMetadata: Record<string, { title: string; description: string }> = {
  'creative': {
    title: 'AI Tools for Creative',
    description: 'Use Claude as a creative sparring partner and NotebookLM as your reference library.',
  },
  'account-management': {
    title: 'AI Tools for Account Management',
    description: 'Prepare for meetings faster, draft client communications, and stay across your clients\' industries.',
  },
  'production': {
    title: 'AI Tools for Production',
    description: 'Create production specs, research vendors, estimate timelines, and troubleshoot technical requirements.',
  },
  'design': {
    title: 'AI Tools for Design',
    description: 'Research trends, translate briefs into visual direction, and articulate design rationale.',
  },
  'digital': {
    title: 'AI Tools for Digital',
    description: 'Interpret analytics, research platform trends, build digital strategy, and troubleshoot campaign performance.',
  },
  'copywriting': {
    title: 'AI Tools for Copywriting',
    description: 'Explore tonal directions, generate headline variants, pressure-test your work, and break through creative blocks.',
  },
  'new-business': {
    title: 'AI Tools for New Business',
    description: 'Research prospects, analyse RFPs, draft proposals, and build competitive pitch intelligence.',
  },
  'project-management': {
    title: 'AI Tools for Project Management',
    description: 'Build timelines, identify risks, write status reports, and keep project documentation sharp.',
  },
};
