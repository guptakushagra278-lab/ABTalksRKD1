import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "@/src/components/AppShell";
import { Button } from "@/src/components/ui/Button";
import { Card, CardContent } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { ArrowRight, Trophy, X, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/src/components/Icons";
import { useAuth } from "@/src/components/AuthProvider";

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) { setError("Username is required"); return; }
    if (!email) { setError("Email is required"); return; }
    if (!password) { setError("Password is required"); return; }
    if (!email.includes("@")) { setError("Invalid email format"); return; }

    setError("");
    setIsLoading(true);
    setTimeout(() => {
      login(username, email);
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col min-h-screen pb-24">
        {/* Header */}
        <header className="px-6 py-5 flex items-center justify-center border-b border-ab-border relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#B7F34A]/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-center relative">
            <span className="font-black tracking-tighter text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-ab-muted drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              AB<span className="text-ab-accent drop-shadow-[0_0_15px_rgba(183,243,74,0.5)]">TALKS</span>
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 pt-10 pb-12 bg-[#0A0A0A] mx-4 mt-6 border-[4px] border-ab-border rounded-[40px] relative overflow-hidden flex flex-col shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-4 bg-[#0A0A0A] flex justify-center items-end pb-1">
            <div className="w-12 h-1 bg-ab-border rounded-full"></div>
          </div>
          
          <div className="mb-6">
            <span className="text-[10px] font-bold text-ab-muted uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
              THE BUILDERS' CHALLENGE
            </span>
          </div>

          <h1 className="text-[32px] md:text-[44px] leading-[0.9] font-black tracking-tight mb-6 uppercase text-ab-text">
            <span className="block">60 DAYS.</span>
            <span className="block">60 BUILDS.</span>
            <span className="block text-ab-accent">ONE BETTER YOU.</span>
          </h1>
          
          <p className="text-ab-secondary text-xs md:text-sm mb-10 leading-relaxed font-medium">
            Build something every day.<br/>
            Prove it with GitHub + LinkedIn.<br/>
            Turn consistency into a public portfolio.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button 
              className="w-full sm:w-auto rounded-xl py-3 text-sm" 
              onClick={() => setShowLoginModal(true)}
            >
              Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              className="w-full sm:w-auto rounded-xl py-3 text-sm" 
              onClick={scrollToHowItWorks}
            >
              Explore the Challenge
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-[#262626]">
            <div>
              <p className="text-sm font-black text-ab-text">60 DAYS</p>
              <p className="text-[9px] text-ab-muted uppercase font-bold tracking-widest mt-0.5">Challenge</p>
            </div>
            <div className="w-px h-8 bg-[#262626]"></div>
            <div>
              <p className="text-sm font-black text-ab-text">1 BUILD</p>
              <p className="text-[9px] text-ab-muted uppercase font-bold tracking-widest mt-0.5">Every day</p>
            </div>
            <div className="w-px h-8 bg-[#262626]"></div>
            <div>
              <p className="text-sm font-black text-ab-text">2 PROOFS</p>
              <p className="text-[9px] text-ab-muted uppercase font-bold tracking-widest mt-0.5">GitHub + LinkedIn</p>
            </div>
          </div>
        </section>

        {/* ABTALKS MISSION / POSITIONING */}
        <section className="px-6 py-20 bg-black text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-ab-text mb-2">
            RAW POTENTIAL<br/>
            <span className="text-ab-accent">×</span><br/>
            TECH INNOVATION
          </h2>
          <div className="w-12 h-1 bg-ab-accent mx-auto my-8"></div>
          <p className="text-sm md:text-base text-ab-secondary max-w-[400px] mx-auto leading-relaxed font-medium">
            "ABtalks bridges raw human potential with tech innovation, creating a fair, transparent platform for the next generation of top developers."
          </p>
        </section>

        {/* WHY ABTALKS */}
        <section className="px-6 py-12">
          <h2 className="text-2xl font-black tracking-tight mb-8 uppercase text-ab-text text-center">
            DON'T JUST LEARN.<br/>BUILD PROOF.
          </h2>
          <div className="space-y-4">
            <Card className="bg-[#111] border-[#262626]">
              <CardContent className="p-5">
                <span className="font-mono text-ab-accent text-xs mb-2 block font-bold">01 — BUILD</span>
                <p className="text-xs text-ab-secondary leading-relaxed">
                  Build real projects consistently instead of only consuming tutorials.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#111] border-[#262626]">
              <CardContent className="p-5">
                <span className="font-mono text-ab-accent text-xs mb-2 block font-bold">02 — PROVE</span>
                <p className="text-xs text-ab-secondary leading-relaxed">
                  Submit GitHub and LinkedIn proof of your work.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#111] border-[#262626]">
              <CardContent className="p-5">
                <span className="font-mono text-ab-accent text-xs mb-2 block font-bold">03 — GET VISIBLE</span>
                <p className="text-xs text-ab-secondary leading-relaxed">
                  Turn your consistency and projects into a public record that can represent your skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="px-6 py-12 bg-[#0A0A0A] border-y border-[#262626]">
          <h2 className="text-[10px] font-mono text-ab-muted uppercase tracking-widest mb-8">
            How it works
          </h2>
          <div className="space-y-8">
            {[
              { num: "01", title: "Pick your track", desc: "Choose the development path you want to follow." },
              { num: "02", title: "Build every day", desc: "Complete one practical build each day." },
              { num: "03", title: "Submit your proof", desc: "Submit your GitHub commit and LinkedIn post." },
              { num: "04", title: "Build your public streak", desc: "Turn 60 days of consistency into visible proof of your skills." }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start relative">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-[#262626] flex items-center justify-center shrink-0 mt-1">
                  <span className="font-mono text-ab-accent text-xs font-bold">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-ab-text mb-1">{step.title}</h3>
                  <p className="text-xs text-ab-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST / TRANSPARENCY SECTION */}
        <section className="px-6 py-16">
          <h2 className="text-2xl font-black tracking-tight mb-10 uppercase text-ab-text text-center">
            <span className="block">YOUR WORK.</span>
            <span className="block">YOUR PROOF.</span>
            <span className="block text-ab-accent">YOUR PROGRESS.</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-[#111] border-[#262626]">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <GithubIcon className="w-5 h-5 text-ab-text" />
                </div>
                <h3 className="font-bold text-xs uppercase mb-1">GitHub</h3>
                <p className="text-ab-muted text-[10px]">What you built</p>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-[#262626]">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#0077B5]/10 flex items-center justify-center mb-3">
                  <LinkedinIcon className="w-5 h-5 text-[#0077B5]" />
                </div>
                <h3 className="font-bold text-xs uppercase mb-1">LinkedIn</h3>
                <p className="text-ab-muted text-[10px]">What you shared</p>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-[#262626]">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-ab-accent/10 flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5 text-ab-accent" />
                </div>
                <h3 className="font-bold text-xs uppercase mb-1">Streak</h3>
                <p className="text-ab-muted text-[10px]">Consistency</p>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-[#262626]">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <div className="w-4 h-4 border-2 border-ab-text rounded-sm"></div>
                </div>
                <h3 className="font-bold text-xs uppercase mb-1">Build Vault</h3>
                <p className="text-ab-muted text-[10px]">What you created</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 bg-black mt-auto border-t border-[#262626] text-center">
          <h2 className="text-3xl font-black tracking-tight mb-4 uppercase text-ab-text">
            READY TO BUILD?
          </h2>
          <p className="text-xs text-ab-secondary mb-8 max-w-[280px] mx-auto leading-relaxed">
            Your next 60 days could look very different.
          </p>
          <Button 
            className="w-full sm:w-auto rounded-xl py-3 px-8 text-sm"
            onClick={() => setShowLoginModal(true)}
          >
            Login
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-[10px] text-ab-muted mt-6 uppercase tracking-widest font-bold">
            Already part of ABTalks? Continue your challenge.
          </p>
        </section>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-[#0A0A0A] border border-[#262626] rounded-2xl shadow-2xl relative overflow-hidden">
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-ab-muted hover:text-white transition-colors btn-interactive btn-interactive-ghost p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-black uppercase text-ab-text">WELCOME BACK</h2>
                  <p className="text-xs text-ab-muted mt-2">Continue building.</p>
                </div>

                <form onSubmit={handleMockLogin} className="space-y-4">
                  <Input 
                    label="USERNAME" 
                    type="text" 
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={error && !username ? error : ""}
                  />
                  <Input 
                    label="EMAIL" 
                    type="email" 
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error && !email ? error : ""}
                  />
                  <Input 
                    label="PASSWORD" 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error && !password ? error : ""}
                  />
                  
                  {error && username && email && password && (
                    <p className="text-[10px] text-red-400 font-medium">{error}</p>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full mt-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Login <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-[10px] text-ab-secondary mt-8 font-medium">
                  New to ABTalks? Create your profile while you start your journey.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
