import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/src/components/AppShell";
import { Button } from "@/src/components/ui/Button";
import { mockTodayTask, mockAchievements } from "@/src/data";
import { Flame, ArrowRight } from "lucide-react";
import { useAuth } from "@/src/components/AuthProvider";
import { BuildProject } from "@/src/types";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [recentBuilds, setRecentBuilds] = useState<BuildProject[]>([]);

  useEffect(() => {
    const builds = JSON.parse(localStorage.getItem('abtalks_builds') || '[]');
    setRecentBuilds(builds.reverse().slice(0, 3));
  }, []);

  if (!user) {
    return null;
  }

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-28 space-y-6 flex flex-col items-center">
        
        {/* Main Dashboard Card wrapper to match design */}
        <div className="w-full max-w-[340px] bg-[#0A0A0A] border-[4px] border-ab-border rounded-[48px] shadow-[0_0_50px_rgba(183,243,74,0.05)] relative overflow-hidden flex flex-col p-6">
          
          {/* Header */}
          <header className="mb-6">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-mono text-ab-muted uppercase tracking-widest">Good Evening, {user.username.toUpperCase()}</p>
              <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="text-[10px] text-ab-muted hover:text-white uppercase tracking-widest font-bold"
              >
                Log out
              </button>
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
            <div className="bg-[#161616] p-4 rounded-2xl border border-[#262626]">
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
            <div className="bg-[#161616] p-5 rounded-2xl border border-[#262626] flex flex-col items-center relative overflow-hidden">
              <div className="relative w-48 h-24 mb-2 mt-4">
                <svg className="w-full h-full transform -rotate-0 overflow-visible" viewBox="0 0 100 50">
                  <path
                    d="M 10,50 A 40,40 0 0,1 90,50"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10,50 A 40,40 0 0,1 90,50"
                    fill="none"
                    stroke="#B7F34A"
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
              
              <div className="w-full grid grid-cols-3 gap-2 border-t border-[#262626] pt-5">
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

          {/* Build Vault */}
          <section className="mt-8">
            <p className="text-[10px] uppercase font-bold text-ab-muted mb-4 tracking-widest px-1">Build Vault</p>
            {recentBuilds.length > 0 ? (
              <div className="space-y-2">
                {recentBuilds.map((build) => (
                  <div key={build.day} className="flex items-center justify-between p-3 bg-[#111] rounded-xl border border-ab-border">
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
