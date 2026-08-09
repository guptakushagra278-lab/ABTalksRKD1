import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/src/components/AppShell";
import { Button } from "@/src/components/ui/Button";
import { mockTodayTask, mockAchievements } from "@/src/data";
import { Flame, ArrowRight, X, Sun, Moon } from "lucide-react";
import { useAuth } from "@/src/components/AuthProvider";
import { useTheme } from "@/src/components/ThemeProvider";
import { BuildProject } from "@/src/types";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [recentBuilds, setRecentBuilds] = useState<BuildProject[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    if (user && user.submissions) {
      setRecentBuilds([...user.submissions].reverse().slice(0, 3));
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <AppShell>
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ab-bg/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-ab-card border border-ab-border-alt rounded-2xl shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute top-4 right-4 text-ab-muted hover:text-ab-text transition-colors btn-interactive btn-interactive-ghost p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <h2 className="text-xl font-black uppercase text-ab-text mb-2">Sign out?</h2>
              <p className="text-sm text-ab-muted mb-8">Are you sure you want to log out of your account?</p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  fullWidth 
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  fullWidth 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-4 pt-6 pb-28 space-y-6 flex flex-col items-center">
        
        {/* Main Dashboard Card wrapper to match design */}
        <div className="w-full max-w-[340px] bg-ab-surface border-[4px] border-ab-border rounded-[48px] shadow-[0_0_50px_var(--color-ab-glow-ghost)] relative overflow-hidden flex flex-col p-6">
          
          {/* Header */}
          <header className="mb-6">
            <div className="flex justify-between items-start">
              <p className="text-xs font-mono text-ab-text font-bold uppercase tracking-widest mt-1">Good Evening, {user.username.toUpperCase()}</p>
              <div className="flex items-center gap-2 -mr-2">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-1 text-ab-muted hover:text-ab-text transition-colors btn-interactive"
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(true)}
                  className="text-[10px] text-ab-muted hover:text-ab-text uppercase tracking-widest font-bold btn-interactive btn-interactive-ghost px-2 py-1 rounded"
                >
                  Log out
                </button>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                <h2 className="text-4xl font-black text-ab-text uppercase leading-none">DAY {user.currentDay}</h2>
                <p className="text-ab-muted text-xs font-medium mt-1">OF {user.totalDays} DAYS</p>
              </div>
              <div className="text-right">
                <div className="text-ab-accent text-2xl font-black italic">
                  {user.currentStreak > 0 ? `🔥 ${user.currentStreak}` : "START"}
                </div>
                <p className="text-[8px] text-ab-muted uppercase tracking-tighter font-bold">
                  {user.currentStreak > 0 ? "Day Streak" : "Start Today"}
                </p>
              </div>
            </div>
          </header>



          {/* Today's Build */}
          <section>
            <div className="bg-ab-card p-4 rounded-2xl border border-ab-border-alt">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[9px] uppercase font-bold text-ab-muted tracking-widest">Today's Build</p>
                <div className="text-[9px] font-bold text-ab-muted uppercase">{mockTodayTask.timeEstimate}</div>
              </div>
              <h3 className="text-sm font-bold text-ab-text mb-1">{mockTodayTask.title}</h3>
              <p className="text-[11px] text-ab-secondary line-clamp-2 leading-snug mb-4">
                {mockTodayTask.description}
              </p>
              <Button fullWidth className="rounded-xl py-2.5 text-xs font-bold" onClick={() => navigate(`/day/${user.currentDay}`)}>
                Start Build
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </section>

          {/* Momentum & Status */}
          <section className="mt-6">
            <div className="bg-ab-card p-5 rounded-2xl border border-ab-border-alt flex flex-col items-center relative overflow-hidden">
              <div className="relative w-48 h-24 mb-2 mt-4">
                <svg className="w-full h-full transform -rotate-0 overflow-visible" viewBox="0 0 100 50">
                  <path
                    d="M 10,50 A 40,40 0 0,1 90,50"
                    fill="none"
                    stroke="var(--color-ab-border-alt)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10,50 A 40,40 0 0,1 90,50"
                    fill="none"
                    stroke="var(--color-ab-accent)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="125.66"
                    strokeDashoffset={125.66 - (user.momentum / 100) * 125.66}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-1">
                  <span className="text-4xl font-black text-ab-text leading-none">{user.momentum}</span>
                </div>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-ab-muted uppercase mb-1 mt-2">Momentum</p>
              <p className="text-xs font-medium text-ab-accent mb-6">You're on track.</p>
              
              <div className="w-full grid grid-cols-3 gap-2 border-t border-ab-border-alt pt-5">
                <div className="text-center">
                  <p className="text-sm font-black text-ab-text">{user.currentStreak}</p>
                  <p className="text-[8px] uppercase tracking-wider text-ab-muted mt-0.5 font-bold">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-ab-text">{user.completedBuilds}</p>
                  <p className="text-[8px] uppercase tracking-wider text-ab-muted mt-0.5 font-bold">Builds</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-ab-text">{user.linkedinSubmissions}</p>
                  <p className="text-[8px] uppercase tracking-wider text-ab-muted mt-0.5 font-bold">LinkedIn</p>
                </div>
              </div>
            </div>
          </section>

          {/* Progress Calendar */}
          <section className="mt-8">
            <p className="text-[10px] uppercase font-bold text-ab-muted mb-4 tracking-widest px-1">60-Day Journey</p>
            <div className="bg-ab-card p-4 rounded-2xl border border-ab-border-alt">
              {/* Status Panel embedded in the card */}
              <div className="h-7 mb-4 flex items-center justify-between px-3 bg-ab-surface/50 rounded-lg border border-ab-border transition-colors duration-200">
                {hoveredDay ? (() => {
                  const isCompleted = user.completedDays?.includes(hoveredDay);
                  const isMissed = !isCompleted && hoveredDay < user.currentDay;
                  const isCurrent = hoveredDay === user.currentDay;
                  return (
                    <>
                      <span className="text-[11px] font-bold text-ab-text">Day {hoveredDay}</span>
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${
                        isCompleted ? 'text-ab-accent' : 
                        isMissed ? 'text-red-500' : 
                        isCurrent ? 'text-ab-text' : 
                        'text-ab-muted'
                      }`}>
                        {isCompleted ? 'Completed' : isMissed ? 'Missed' : isCurrent ? 'Current' : 'Upcoming'}
                      </span>
                    </>
                  );
                })() : (
                  <span className="text-[9px] uppercase tracking-widest text-ab-muted font-bold mx-auto">
                    Hover over a day to see status
                  </span>
                )}
              </div>

              <div className="grid grid-cols-10 gap-1.5">
                {Array.from({ length: user.totalDays }).map((_, index) => {
                  const day = index + 1;
                  const isCompleted = user.completedDays?.includes(day);
                  const isMissed = !isCompleted && day < user.currentDay;
                  const isCurrent = day === user.currentDay;
                  
                  let bgColor = "bg-ab-card-alt border-ab-border-alt text-ab-muted";
                  if (isCompleted) bgColor = "bg-ab-accent border-ab-accent text-ab-bg";
                  else if (isMissed) bgColor = "bg-red-500/10 border-red-500/20 text-red-500/70";
                  else if (isCurrent) bgColor = "bg-ab-accent/20 border-ab-accent/50 text-ab-accent animate-pulse";
                  
                  return (
                    <div 
                      key={day}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`Day ${day}${isCompleted ? ' - Completed' : isMissed ? ' - Missed' : isCurrent ? ' - Current' : ''}`}
                      className={`aspect-square rounded-[4px] border flex items-center justify-center text-[7px] font-bold transition-all duration-200 cursor-default hover:scale-110 hover:z-10 ${bgColor}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-5 px-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-[2px] bg-ab-accent"></div>
                  <span className="text-[8px] uppercase font-bold tracking-widest text-ab-muted">Done</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-[2px] bg-red-500/10 border border-red-500/20"></div>
                  <span className="text-[8px] uppercase font-bold tracking-widest text-ab-muted">Missed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-[2px] bg-ab-card-alt border border-ab-border-alt"></div>
                  <span className="text-[8px] uppercase font-bold tracking-widest text-ab-muted">Pending</span>
                </div>
              </div>
            </div>
          </section>

          {/* Build Vault */}
          <section className="mt-8">
            <p className="text-[10px] uppercase font-bold text-ab-muted mb-4 tracking-widest px-1">Build Vault</p>
            {recentBuilds.length > 0 ? (
              <div className="space-y-2">
                {recentBuilds.map((build) => (
                  <div key={build.day} className="flex items-center justify-between p-3 bg-ab-card-alt rounded-xl border border-ab-border">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-ab-muted">{build.day.toString().padStart(2, '0')}</span>
                      <span className="text-[11px] text-ab-text font-medium">{build.title}</span>
                    </div>
                    <div className="w-2 h-2 bg-ab-accent rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-ab-muted">
                No builds yet. Start today!
              </div>
            )}
          </section>

        </div>

      </div>
    </AppShell>
  );
}
