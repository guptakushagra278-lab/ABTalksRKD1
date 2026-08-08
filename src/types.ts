export interface Student {
  name: string;
  track: string;
  currentDay: number;
  totalDays: number;
  currentStreak: number;
  bestStreak: number;
  completedBuilds: number;
  linkedinSubmissions: number;
  momentum: number;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  isUnlocked: boolean;
}

export interface BuildProject {
  day: number;
  title: string;
  githubUrl?: string;
  liveUrl?: string;
  linkedinUrl?: string;
}

export interface ChallengeTask {
  day: number;
  title: string;
  description: string;
  timeEstimate: string;
  checklist: string[];
  guidance: string;
}

export interface SubmissionData {
  githubRepo: string;
  githubCommit: string;
  linkedinPost: string;
  liveUrl: string;
}
