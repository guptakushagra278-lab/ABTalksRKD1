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
import { motion } from "motion/react";

export default function ChallengeDay() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const day = user ? user.currentDay : (id ? parseInt(id) : mockTodayTask.day);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    githubRepo: "",
    githubCommit: "",
    linkedinPost: "",
    liveUrl: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState<"en" | "hi">("en");

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
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          {/* Confetti Particles */}
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const velocity = 50 + Math.random() * 200;
              const size = 6 + Math.random() * 6;
              const colors = ["var(--color-ab-accent)", "var(--color-ab-text)", "var(--color-ab-border)", "var(--color-ab-muted)"];
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * velocity,
                    y: Math.sin(angle) * velocity + (Math.random() * 200),
                    scale: [0, 1, 0.5],
                    opacity: [1, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    ease: "easeOut",
                  }}
                  className="absolute rounded-sm"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: colors[i % colors.length],
                  }}
                />
              );
            })}
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-20 h-20 bg-ab-accent/20 text-ab-accent rounded-full flex items-center justify-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black mb-2 tracking-tight uppercase text-ab-text"
          >
            DAY {day} COMPLETE
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-ab-secondary mb-8 text-sm"
          >
            Your build has been submitted.
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="bg-ab-card border border-ab-border-alt rounded-2xl p-6 mb-10 w-full max-w-sm"
          >
            <div className="inline-flex items-center text-ab-accent font-black text-xl italic mb-2">
              <Flame className="w-5 h-5 mr-2" fill="currentColor" />
              {user.currentStreak} DAY STREAK
            </div>
            <p className="text-[10px] font-bold text-ab-muted uppercase tracking-widest mt-1">
              Crossed {Math.round((day / user.totalDays) * 100)}% of the challenge
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-sm space-y-3"
          >
            <Button fullWidth onClick={() => navigate("/dashboard")} className="py-3">
              View your progress
            </Button>
            <Button fullWidth variant="ghost" onClick={() => navigate("/dashboard")} className="py-3">
              Back to dashboard
            </Button>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-28 flex flex-col items-center">
        
        <div className="w-full max-w-[340px] bg-ab-surface border-[4px] border-ab-border rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
          <div className="px-5 pt-8 pb-4">
            
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => navigate("/dashboard")}
                className="text-[10px] text-ab-muted font-bold hover:text-ab-text transition-colors uppercase btn-interactive btn-interactive-ghost px-2 py-1 -ml-2 rounded"
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
                <div className="text-[9px] uppercase font-bold px-2 py-1 bg-ab-surface-alt border border-ab-border-alt text-ab-secondary rounded">
                  45–60 MIN
                </div>
                <div className="text-[9px] uppercase font-bold px-2 py-1 bg-ab-surface-alt border border-ab-border-alt text-ab-secondary rounded">
                  INTERMEDIATE
                </div>
              </div>
            </div>

            {/* What you're building */}
            <div className="mb-8 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted">What You're Building</h3>
                <div className="flex items-center text-[10px] font-bold tracking-widest">
                  <button 
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "transition-colors px-1", 
                      language === "en" ? "text-ab-accent" : "text-ab-muted hover:text-ab-text"
                    )}
                  >
                    {language === "en" ? "[ EN ]" : "EN"}
                  </button>
                  <span className="text-ab-muted mx-1">|</span>
                  <button 
                    onClick={() => setLanguage("hi")}
                    className={cn(
                      "transition-colors px-1", 
                      language === "hi" ? "text-ab-accent" : "text-ab-muted hover:text-ab-text"
                    )}
                  >
                    {language === "hi" ? "[ हिंदी ]" : "हिंदी"}
                  </button>
                </div>
              </div>
              <p className="text-xs text-ab-secondary leading-relaxed">
                {language === "en" ? (
                  <>
                    You are designing and building a responsive landing page for a fictional technology startup.
                    The goal is to create a page that communicates the startup's value proposition quickly and gives visitors a clear reason to take action.
                  </>
                ) : (
                  <>
                    आप एक काल्पनिक टेक्नोलॉजी स्टार्टअप के लिए एक responsive landing page डिज़ाइन और तैयार कर रहे हैं।
                    आपका लक्ष्य ऐसा पेज बनाना है जो स्टार्टअप की value proposition को जल्दी और स्पष्ट रूप से बताए और visitors को action लेने के लिए एक स्पष्ट कारण दे।
                  </>
                )}
              </p>
            </div>

            {/* Your objective */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-2">Your Objective</h3>
              <p className="text-xs text-ab-secondary leading-relaxed mb-3">
                {language === "en" 
                  ? "Create a landing page that looks professional on mobile and desktop while maintaining a clear visual hierarchy. Focus on:"
                  : "एक ऐसा landing page तैयार करें जो mobile और desktop दोनों पर professional दिखाई दे और जिसमें visual hierarchy स्पष्ट हो। Focus on:"
                }
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
                <div className="bg-ab-card border border-ab-border-alt p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">01</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Hero</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">
                    {language === "en"
                      ? "Startup name, strong headline, short supporting description, and primary CTA."
                      : "Startup का नाम, एक प्रभावशाली headline, छोटा supporting description और primary CTA तैयार करें।"
                    }
                  </p>
                </div>
                
                <div className="bg-ab-card border border-ab-border-alt p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">02</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Value Proposition</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">
                    {language === "en"
                      ? "Explain what the fictional startup does. Show 2–4 key benefits/features."
                      : "बताएं कि fictional startup क्या करता है और उसकी 2–4 मुख्य benefits या features दिखाएं।"
                    }
                  </p>
                </div>

                <div className="bg-ab-card border border-ab-border-alt p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">03</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Social Proof</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">
                    {language === "en"
                      ? "Establish credibility with a customer quote, user count, company logos, or a rating/stat."
                      : "विश्वसनीयता बढ़ाने के लिए एक छोटा section जोड़ें, जैसे customer quote, user count, company logos या rating।"
                    }
                  </p>
                </div>

                <div className="bg-ab-card border border-ab-border-alt p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">04</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Final CTA</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">
                    {language === "en"
                      ? "End with a strong call-to-action that encourages the visitor to take the next step."
                      : "एक मजबूत call-to-action के साथ समाप्त करें जो visitor को अगला कदम उठाने के लिए प्रेरित करे।"
                    }
                  </p>
                </div>

                <div className="bg-ab-card border border-ab-border-alt p-4 rounded-xl">
                  <div className="text-[9px] font-mono font-bold text-ab-muted mb-1">05</div>
                  <h4 className="text-xs font-bold text-ab-text mb-1 uppercase tracking-wider">Responsive Experience</h4>
                  <p className="text-[11px] text-ab-secondary leading-relaxed">
                    {language === "en"
                      ? "Make sure the page works well on mobile, tablet, and desktop. The mobile version is primary."
                      : "सुनिश्चित करें कि page mobile, tablet और desktop पर अच्छी तरह काम करे। Mobile version को primary experience मानकर डिज़ाइन करें।"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Build Guidance */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-2">Before You Start</h3>
              <p className="text-xs text-ab-secondary leading-relaxed">
                {language === "en"
                  ? "Start with the mobile layout first. Keep the hero immediately understandable. Use spacing and typography to establish hierarchy. Avoid adding elements simply to fill space. Every section should have a clear purpose."
                  : "सबसे पहले mobile layout से शुरुआत करें। Hero section को तुरंत समझने योग्य रखें। Visual hierarchy बनाने के लिए spacing और typography का उपयोग करें। सिर्फ जगह भरने के लिए अनावश्यक elements न जोड़ें। हर section का एक स्पष्ट उद्देश्य होना चाहिए।"
                }
              </p>
            </div>

            {/* What good looks like */}
            <div className="mb-8">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-3">What Good Looks Like</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-ab-card-alt p-3 rounded-lg border border-ab-border-alt">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Clear</p>
                  <p className="text-[9px] text-ab-secondary">
                    {language === "en"
                      ? "A visitor understands the product within seconds."
                      : "Visitor कुछ ही सेकंड में product को समझ सके।"
                    }
                  </p>
                </div>
                <div className="bg-ab-card-alt p-3 rounded-lg border border-ab-border-alt">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Responsive</p>
                  <p className="text-[9px] text-ab-secondary">
                    {language === "en"
                      ? "The layout feels intentional at every screen size."
                      : "हर screen size पर layout व्यवस्थित और intentional महसूस हो।"
                    }
                  </p>
                </div>
                <div className="bg-ab-card-alt p-3 rounded-lg border border-ab-border-alt">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Polished</p>
                  <p className="text-[9px] text-ab-secondary">
                    {language === "en"
                      ? "Typography, spacing, alignment, and interactions feel considered."
                      : "Typography, spacing, alignment और interactions अच्छी तरह सोच-समझकर तैयार किए गए हों।"
                    }
                  </p>
                </div>
                <div className="bg-ab-card-alt p-3 rounded-lg border border-ab-border-alt">
                  <p className="text-[10px] font-bold text-ab-text uppercase mb-1">Actionable</p>
                  <p className="text-[9px] text-ab-secondary">
                    {language === "en"
                      ? "The CTA is obvious and compelling."
                      : "CTA स्पष्ट और आकर्षक हो।"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Optional Stretch */}
            <div className="mb-12">
              <details className="group">
                <summary className="text-[10px] uppercase font-bold tracking-widest text-ab-accent cursor-pointer list-none flex items-center">
                  <span className="mr-2">Want to go further?</span>
                  <span className="group-open:rotate-180 transition-transform text-ab-accent">▼</span>
                </summary>
                <p className="text-xs text-ab-secondary leading-relaxed mt-3 pl-2 border-l-2 border-ab-border-alt">
                  {language === "en"
                    ? "If you finish early, add one thoughtful interaction or micro-animation that improves the experience without distracting from the content."
                    : "यदि आप जल्दी पूरा कर लेते हैं, तो एक thoughtful interaction या micro-animation जोड़ें जो content से ध्यान भटकाए बिना experience को बेहतर बनाए।"
                  }
                </p>
              </details>
            </div>

            {/* Divider */}
            <div className="border-t border-ab-border-alt w-full mb-8"></div>

            {/* Ready to Submit */}
            <div className="mb-6 text-center">
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-ab-muted mb-1">Ready to submit?</h3>
              <p className="text-xl font-black text-ab-text italic uppercase">You've built your project.<br/>Now prove it.</p>
            </div>

            {/* Submission Form */}
            <div className="bg-ab-card p-4 rounded-xl border border-ab-border-alt">
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
                    <span className="flex items-center gap-2 text-[10px] font-mono text-ab-muted">
                      <div className="w-1.5 h-1.5 bg-ab-bg rounded-full animate-pulse"></div>
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
