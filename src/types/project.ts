export type ProjectStatus = 'live' | 'archived' | 'wip';

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  status: ProjectStatus;
  accentColor: string; // CSS color for per-card neon glow variation
  category: string;
}
