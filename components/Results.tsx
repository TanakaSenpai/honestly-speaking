"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Mock results for demo
const mockFragments = [
  "Serial Overthinker on a Coffee Binge",
  "Professional Excuse Generator",
  "Emotionally Confused but Still Charming",
  "Midnight Oversharer",
  "Anxiety Artist",
  "Truth Bomber",
];

const mockVerdict = {
  title: "The Beautifully Chaotic Overthinker",
  description:
    "You're like a walking contradiction wrapped in good intentions and fueled by caffeine. You overthink everything, share too much at 3 AM, and somehow still manage to be endearingly charming. Your brain is a 24/7 soap opera, and honestly? We're here for it. You're the friend who gives brutally honest advice while secretly being a mess yourself, and that's what makes you absolutely magnetic.",
  mood: "Chaotically Honest",
  vibe: "Main Character Energy with Side Character Anxiety",
};

const Results = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shareText, setShareText] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Trigger animations on load
    setTimeout(() => setIsVisible(true), 300);

    // Generate share text
    setShareText(
      `I just got roasted by Honestly Speaking... 🔮\n\nMy fragments: ${mockFragments
        .slice(0, 3)
        .join(", ")}\n\nVerdict: ${
        mockVerdict.title
      }\n\nWhat's your chaos level? Take the test!`
    );
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Honestly Speaking Results",
        text: shareText,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      // Show toast or similar feedback
    }
  };

  const handleRetake = () => {
    router.push("/questions");
  };

  return (
    <div className="min-h-screen bg-background font-gaming relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-float"></div>
      <div className="absolute inset-0 bg-gradient-cyber opacity-10"></div>

      {/* Celebration Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {["✨", "🔮", "🎭", "💫", "🌟"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-4 glitch-text neon-glow"
            data-text="Your Fragments Revealed"
          >
            Your Fragments Revealed
          </h1>
          <p className="text-xl text-accent">
            The roast is complete. Behold your beautiful chaos.
          </p>
        </div>

        {/* Main Results Card */}
        <Card
          className={`cyber-card max-w-4xl mx-auto p-8 mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Verdict */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-pulse-neon">
              {mockVerdict.title}
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              {mockVerdict.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="fragment-badge p-4 rounded-lg">
                <h3 className="font-bold text-secondary mb-1">Current Mood:</h3>
                <p className="text-sm">{mockVerdict.mood}</p>
              </div>
              <div className="fragment-badge p-4 rounded-lg">
                <h3 className="font-bold text-accent mb-1">Overall Vibe:</h3>
                <p className="text-sm">{mockVerdict.vibe}</p>
              </div>
            </div>
          </div>

          {/* Fragment Collection */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center text-foreground mb-6">
              Your Fragment Collection 🏆
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockFragments.map((fragment, i) => (
                <div
                  key={i}
                  className={`fragment-badge p-4 rounded-lg text-center transition-all duration-500 delay-${
                    i * 100
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-2xl mb-2">
                    {["🧠", "🎭", "💫", "📱", "🎨", "💣"][i] || "✨"}
                  </div>
                  <p className="text-sm font-medium">{fragment}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div
          className={`text-center space-y-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleShare}
              className="neon-button text-lg px-10 py-4 text-primary-foreground font-bold"
            >
              Share Your Chaos 📱
            </Button>

            <Button
              onClick={handleRetake}
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg"
            >
              Get Roasted Again 🔄
            </Button>

            <Button
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg"
            >
              Save Results 💾
            </Button>
          </div>

          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your fragments may evolve over time. Come back tomorrow and see if
            you're still the same beautiful disaster.
          </p>
        </div>

        {/* Snarky AI Sign-off */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Card className="cyber-card max-w-lg mx-auto p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl animate-float">🤖</div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground font-mono mb-1">
                  AI Narrator's final verdict:
                </p>
                <p className="text-accent font-medium">
                  "You're wonderfully weird. Never change... actually, please do
                  change. We need content for the next test." 🎭
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
