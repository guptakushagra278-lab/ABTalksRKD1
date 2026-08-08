import { Student, Achievement, BuildProject, ChallengeTask } from "./types";

export const mockStudent: Student = {
  name: "Rishi",
  track: "Full Stack Development",
  currentDay: 12,
  totalDays: 60,
  currentStreak: 11,
  bestStreak: 18,
  completedBuilds: 12,
  linkedinSubmissions: 11,
  momentum: 92,
};

export const mockAchievements: Achievement[] = [
  { id: "1", title: "7 Day Streak", icon: "Flame", isUnlocked: true },
  { id: "2", title: "First Deployment", icon: "Rocket", isUnlocked: true },
  { id: "3", title: "10 Builds", icon: "Layers", isUnlocked: true },
  { id: "4", title: "30 Day Streak", icon: "Trophy", isUnlocked: false },
];

export const mockRecentBuilds: BuildProject[] = [
  {
    day: 11,
    title: "Weather Dashboard",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    day: 10,
    title: "Todo Application",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    day: 9,
    title: "Portfolio Page",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    day: 8,
    title: "Expense Tracker",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    linkedinUrl: "https://linkedin.com",
  },
];

export const mockTodayTask: ChallengeTask = {
  day: 12,
  title: "Responsive Startup Landing Page",
  description: "Create a polished mobile-first landing page for a fictional startup.",
  timeEstimate: "45–60 min",
  checklist: [
    "Hero section",
    "Feature section",
    "Social proof",
    "CTA",
    "Responsive layout"
  ],
  guidance: "Focus on typography and spacing. Ensure touch targets are at least 44px for mobile users. Don't worry about backend connectivity today."
};
