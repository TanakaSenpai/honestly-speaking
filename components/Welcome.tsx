"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/ui/AuthModal";

const Welcome = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; delay: string; duration: string }>
  >([]);
  const [showAuth, setShowAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Generate particle positions only on client side
    const particleData = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`,
    }));
    setParticles(particleData);
  }, []);

  const handleStart = () => {
    setIsAnimating(true);
    // Navigate to questions after animation
    setTimeout(() => {
      router.push("/questions");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background font-gaming relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-float"></div>
      <div className="absolute inset-0 bg-gradient-cyber opacity-10"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1
            className="text-6xl md:text-8xl font-bold mb-4 glitch-text neon-glow"
            data-text="🔮 Honestly Speaking..."
          >
            🔮 Honestly Speaking...
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-6 animate-pulse-neon">
            Uncover Your Mess
          </h2>
        </div>

        {/* Description Card */}
        <Card className="cyber-card max-w-4xl mx-auto p-8 mb-12 animate-bounce-in">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
              This isn't your grandma's personality test. It's a
              <span className="text-accent font-bold">
                {" "}
                wildly entertaining
              </span>
              ,<span className="text-secondary font-bold"> sarcastic</span>,
              <span className="text-primary font-bold"> borderline weird</span>{" "}
              digital experience.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="text-left space-y-3">
                <h3 className="text-lg font-bold text-accent">
                  You'll Get Fragments Like:
                </h3>
                <div className="space-y-2">
                  <div className="fragment-badge rounded-full px-4 py-2 text-sm">
                    "Serial Overthinker on a Coffee Binge" ☕
                  </div>
                  <div className="fragment-badge rounded-full px-4 py-2 text-sm">
                    "Professional Excuse Generator" 🎭
                  </div>
                  <div className="fragment-badge rounded-full px-4 py-2 text-sm">
                    "Emotionally Confused but Still Charming" 💫
                  </div>
                </div>
              </div>

              <div className="text-left space-y-3">
                <h3 className="text-lg font-bold text-secondary">
                  What Makes It Different:
                </h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>✨ Narratives that feel like fever dreams</li>
                  <li>🔍 Fragments, not boring labels</li>
                  <li>🎨 Shareworthy, eye-candy results</li>
                  <li>🔄 Replay without regret</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleStart}
              className={`neon-button text-xl px-12 py-6 text-primary-foreground font-bold ${
                isAnimating ? "animate-pulse" : ""
              }`}
              disabled={isAnimating}
            >
              {isAnimating
                ? "Loading Your Chaos..."
                : "Start Getting Roasted 🔥"}
            </Button>
            <Button
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg"
              onClick={() => setShowAuth(true)}
            >
              Sign In First 👤
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Warning: May cause excessive self-awareness and uncontrollable
            honesty
          </p>
        </div>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

        {/* Feature Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: "🧠",
              title: "Weird Questions",
              desc: "Oddly poetic, brutally honest",
            },
            {
              emoji: "🎭",
              title: "Sarcastic AI",
              desc: "Your roast master awaits",
            },
            {
              emoji: "✨",
              title: "Share Results",
              desc: "Flex your beautiful chaos",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="cyber-card p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
