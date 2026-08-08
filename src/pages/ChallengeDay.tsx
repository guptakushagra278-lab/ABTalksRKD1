import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "@/src/components/AppShell";
import { Button } from "@/src/components/ui/Button";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { mockTodayTask } from "@/src/data";
import { ChevronLeft, CheckCircle2, Flame, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/components/AuthProvider";

export default function ChallengeDay() {
  const navigate = useNavigate();
  const { id } = useParams();
  const day = id ? parseInt(id) : mockTodayTask.day;
  const { user, updateUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    githubRepo: "",
    githubCommit: "",
    linkedinPost: "",
    liveUrl: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const newErrors: Record<string, string> = {};
    if (!formData.githubRepo || !validateUrl(formData.githubRepo)) newErrors.githubRepo = "Valid URL required";
    if (!formData.githubCommit || !validateUrl(formData.githubCommit)) newErrors.githubCommit = "Valid URL required";
    if (!formData.linkedinPost || !validateUrl(formData.linkedinPost)) newErrors.linkedinPost = "Valid URL required";
    if (!formData.liveUrl || !validateUrl(formData.liveUrl)) newErrors.liveUrl = "Valid URL required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const builds = JSON.parse(localStorage.getItem('abtalks_builds') || '[]');
      builds.push({
        day: day,
        title: mockTodayTask.title,
        githubRepo: formData.githubRepo,
        githubCommit: formData.githubCommit,
        linkedinPost: formData.linkedinPost,
        liveUrl: formData.liveUrl,
      });
      localStorage.setItem('abtalks_builds', JSON.stringify(builds));

      updateUser({
        currentDay: user.currentDay + 1,
        currentStreak: user.currentStreak + 1,
        bestStreak: Math.max(user.bestStreak, user.currentStreak + 1),
        completedBuilds: user.completedBuilds + 1,
        momentum: Math.min(100, user.momentum + 5)
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (!user) {
    return null;
  }

  if (isSuccess) {
    return (
      <AppShell>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-ab-accent/20 text-ab-accent rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight uppercase text-ab-text">DAY {day} COMPLETE</h1>
          <p className="text-ab-secondary mb-8 text-sm">Your build has been submitted.</p>
          
          <div className="bg-[#161616] border border-[#262626] rounded-2xl p-6 mb-10 w-full max-w-sm">
            <div className="inline-flex items-center text-ab-accent font-black text-xl italic mb-2">
              <Flame className="w-5 h-5 mr-2" fill="currentColor" />
              {user.currentStreak} DAY STREAK
            </div>
            <p className="text-[10px] font-bold text-ab-muted uppercase tracking-widest mt-1">
              Crossed {Math.round((day / user.totalDays) * 100)}% of the challenge
            </p>
          </div>

          <div className="w-full max-w-sm space-y-3">
            <Button fullWidth onClick={() => navigate("/dashboard")} className="py-3">
              View your progress
            </Button>
            <Button fullWidth variant="ghost" onClick={() => navigate("/dashboard")} className="py-3">
              Back to dashboard
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-28 flex flex-col items-center">
        
        <div className="w-full max-w-[340px] bg-[#0A0A0A] border-[4px] border-ab-border rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
          <div className="px-5 pt-8 pb-4">
            
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => navigate("/dashboard")}
                className="text-[10px] text-ab-muted font-bold hover:text-ab-text transition-colors uppercase"
              >
                ← BACK
              </button>
              <span className="text-[10px] font-mono text-ab-accent font-bold">DAY {day} / {user.totalDays}</span>
            </div>

            {/* Context */}
            <div className="mb-8">
              <p className="text-xl font-black uppercase text-ab-text">HEY, {user.username}.</p>
              <div className="text-ab-accent font-black italic flex items-center mt-1">
                <Flame className="w-4 h-4 mr-1" fill="currentColor" />
                {user.currentStreak > 0 ? `${user.currentStreak} DAY STREAK` : "START"}
              </div>
            </div>

            {/* Today's Build */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-2">Today's Build</h3>
              <h2 className="text-2xl font-black uppercase text-ab-text mb-3 leading-tight">Responsive Startup Landing Page</h2>
              <div className="flex gap-2">
                <div className="text-[9px] uppercase font-bold px-2 py-1 bg-[#1A1A1A] border border-[#262626] text-ab-secondary rounded">
                  45–60 MIN
                </div>
                <div className="text-[9px] uppercase font-bold px-2 py-1 bg-[#1A1A1A] border border-[#262626] text-ab-secondary rounded">
                  INTERMEDIATE
                </div>
              </div>
            </div>

            {/* What you're building */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-2">What You're Building</h3>
              <p className="text-xs text-ab-secondary leading-relaxed">
                You are designing and building a responsive landing page for a fictional technology startup.
                The goal is to create a page that communicates the startup's value proposition quickly and gives visitors a clear reason to take action.
              </p>
            </div>

            {/* Your objective */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-2">Your Objective</h3>
              <p className="text-xs text-ab-secondary leading-relaxed mb-3">
                Create a landing page that looks professional on mobile and desktop while maintaining a clear visual hierarchy. Focus on:
              </p>
              <ul className="text-xs text-ab-secondary leading-relaxed list-disc pl-4 space-y-1">
                <li>Clear messaging</li>
                <li>Strong visual hierarchy</li>
                <li>Responsive layout</li>
                <li>Good spacing</li>
                <li>Accessible interactions</li>
                <li>A clear call-to-action</li>
              </ul>
            </div>

            {/* What to build */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-3">What To Build</h3>
              
              <div className="space-y-3">
                <div className="bg-[#161616] border border-[#262626] p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">01</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Hero</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">Startup name, strong headline, short supporting description, and primary CTA.</p>
                </div>
                
                <div className="bg-[#161616] border border-[#262626] p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">02</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Value Proposition</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">Explain what the fictional startup does. Show 2–4 key benefits/features.</p>
                </div>

                <div className="bg-[#161616] border border-[#262626] p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">03</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Social Proof</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">Establish credibility with a customer quote, user count, company logos, or a rating/stat.</p>
                </div>

                <div className="bg-[#161616] border border-[#262626] p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">04</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Final CTA</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">End with a strong call-to-action that encourages the visitor to take the next step.</p>
                </div>

                <div className="bg-[#161616] border border-[#262626] p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">05</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Responsive Experience</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">Make sure the page works well on mobile, tablet, and desktop. The mobile version is primary.</p>
                </div>
              </div>
            </div>

            {/* Build Guidance */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-2">Before You Start</h3>
              <p className="text-xs text-ab-secondary leading-relaxed">
                Start with the mobile layout first. Keep the hero immediately understandable. Use spacing and typography to establish hierarchy. Avoid adding elements simply to fill space. Every section should have a clear purpose.
              </p>
            </div>

            {/* What good looks like */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-3">What Good Looks Like</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#111] p-3 rounded-lg border border-[#1e1e1e]">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Clear</p>
                  <p className="text-[9px] text-ab-secondary">A visitor understands the product within seconds.</p>
                </div>
                <div className="bg-[#111] p-3 rounded-lg border border-[#1e1e1e]">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Responsive</p>
                  <p className="text-[9px] text-ab-secondary">The layout feels intentional at every screen size.</p>
                </div>
                <div className="bg-[#111] p-3 rounded-lg border border-[#1e1e1e]">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Polished</p>
                  <p className="text-[9px] text-ab-secondary">Typography, spacing, alignment, and interactions feel considered.</p>
                </div>
                <div className="bg-[#111] p-3 rounded-lg border border-[#1e1e1e]">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Actionable</p>
                  <p className="text-[9px] text-ab-secondary">The CTA is obvious and compelling.</p>
                </div>
              </div>
            </div>

            {/* Optional Stretch */}
            <div className="mb-12">
              <details className="group">
                <summary className="text-[10px] uppercase font-bold tracking-widest text-ab-accent cursor-pointer list-none flex items-center">
                  <span className="mr-2">Want to go further?</span>
                  <span className="group-open:rotate-180 transition-transform text-[#B7F34A]">▼</span>
                </summary>
                <p className="text-xs text-ab-secondary leading-relaxed mt-3 pl-2 border-l-2 border-[#262626]">
                  If you finish early, add one thoughtful interaction or micro-animation that improves the experience without distracting from the content.
                </p>
              </details>
            </div>

            {/* Divider */}
            <div className="border-t border-[#262626] w-full mb-8"></div>

            {/* Ready to Submit */}
            <div className="mb-6 text-center">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-1">Ready to submit?</h3>
              <p className="text-xl font-black text-ab-text italic uppercase">You've built your project.<br/>Now prove it.</p>
            </div>

            {/* Submission Form */}
            <div className="bg-[#161616] p-4 rounded-xl border border-[#262626]">
              <p className="text-[9px] uppercase font-bold text-ab-muted mb-3">Submission Proof</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input 
                  label="GitHub Repository" 
                  placeholder="github.com/..." 
                  value={formData.githubRepo}
                  onChange={handleInputChange("githubRepo")}
                  error={errors.githubRepo}
                />
                <Input 
                  label="Commit URL" 
                  placeholder="github.com/.../commit/..." 
                  value={formData.githubCommit}
                  onChange={handleInputChange("githubCommit")}
                  error={errors.githubCommit}
                />
                <Input 
                  label="Live Demo URL" 
                  placeholder="https://..." 
                  value={formData.liveUrl}
                  onChange={handleInputChange("liveUrl")}
                  error={errors.liveUrl}
                />
                <Input 
                  label="LinkedIn Proof" 
                  placeholder="linkedin.com/posts/..." 
                  value={formData.linkedinPost}
                  onChange={handleInputChange("linkedinPost")}
                  error={errors.linkedinPost}
                />

                <Button 
                  type="submit" 
                  fullWidth 
                  className="mt-4 rounded-xl text-xs py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-[10px] font-mono text-[#52525B]">
                      <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                      PROCESSING...
                    </span>
                  ) : (
                    `SUBMIT BUILD`
                  )}
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </AppShell>
  );
}
