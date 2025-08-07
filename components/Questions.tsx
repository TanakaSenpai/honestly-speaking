"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

// Sample questions for the demo
const questions = [
  {
    id: 1,
    text: "It's 3 AM and you're lying in bed. Your brain decides to replay that embarrassing thing you did in 7th grade. You:",
    answers: [
      {
        text: "Embrace the cringe and create a whole mental slideshow",
        fragments: ["Serial Overthinker", "Nostalgia Addict"],
      },
      {
        text: "Aggressively think about something else until you fall asleep",
        fragments: ["Mental Escape Artist", "Sleep Warrior"],
      },
      {
        text: "Text someone else about it because misery loves company",
        fragments: ["Midnight Oversharer", "Social Validator"],
      },
      {
        text: "Write it down as 'character development'",
        fragments: ["Professional Rationalizer", "Self-Help Guru"],
      },
    ],
  },
  {
    id: 2,
    text: "Your friend asks for 'honest feedback' on their questionable life choice. In reality, you:",
    answers: [
      {
        text: "Tell them exactly what they want to hear",
        fragments: ["People Pleaser Supreme", "Conflict Avoider"],
      },
      {
        text: "Give brutally honest advice they'll ignore anyway",
        fragments: ["Truth Bomber", "Wisdom Waster"],
      },
      {
        text: "Ask 47 follow-up questions to avoid giving an answer",
        fragments: ["Professional Deflector", "Question Collector"],
      },
      {
        text: "Panic because you're probably making worse choices",
        fragments: ["Self-Doubt Specialist", "Hypocrite Hunter"],
      },
    ],
  },
  {
    id: 3,
    text: "You just sent a risky text. The read receipts are on. It's been 12 minutes. Your mental state is:",
    answers: [
      {
        text: "Analyzing their online activity like a digital detective",
        fragments: ["Cyber Stalker Lite", "Pattern Recognition Expert"],
      },
      {
        text: "Already planning your fake death and new identity",
        fragments: ["Drama Maximizer", "Escape Plan Architect"],
      },
      {
        text: "Convincing yourself they're probably just busy",
        fragments: ["Optimism Warrior", "Reality Denier"],
      },
      {
        text: "Drafting 5 different follow-up texts you'll never send",
        fragments: ["Message Draft Hoarder", "Anxiety Artist"],
      },
    ],
  },
];

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [collectedFragments, setCollectedFragments] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    setIsAnimating(true);

    // Collect fragments from selected answer
    const answer = questions[currentQuestion].answers[selectedAnswer];
    setCollectedFragments((prev) => [...prev, ...answer.fragments]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnimating(false);
      } else {
        // Navigate to results
        router.push("/results");
      }
    }, 600);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background font-gaming relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-float"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fragment Quest 🔮
          </h1>
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Current Fragments */}
        {collectedFragments.length > 0 && (
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">
              Collected Fragments:
            </h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {collectedFragments.map((fragment, i) => (
                <div
                  key={i}
                  className="fragment-badge rounded-full px-3 py-1 text-xs animate-bounce-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {fragment}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Card */}
        <Card
          className={`cyber-card max-w-4xl mx-auto p-8 mb-8 transition-all duration-500 ${
            isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
              {currentQ.text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="grid gap-4">
            {currentQ.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`cyber-card p-6 text-left transition-all duration-300 hover:scale-102 ${
                  selectedAnswer === index
                    ? "border-primary bg-primary/10 shadow-neon"
                    : "hover:border-accent/50"
                }`}
              >
                <p className="text-foreground/90 text-lg leading-relaxed">
                  {answer.text}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {answer.fragments.map((fragment, i) => (
                    <span
                      key={i}
                      className="text-xs text-accent font-mono bg-accent/10 px-2 py-1 rounded"
                    >
                      +{fragment}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="text-center">
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null || isAnimating}
            className={`neon-button px-12 py-4 text-lg font-bold ${
              selectedAnswer !== null ? "animate-pulse-neon" : ""
            }`}
          >
            {isAnimating
              ? "Processing Your Chaos..."
              : currentQuestion === questions.length - 1
              ? "Reveal My Fragments 🎭"
              : "Next Question 🚀"}
          </Button>
        </div>

        {/* Snarky AI Narrator */}
        <div className="mt-12 text-center">
          <Card className="cyber-card max-w-md mx-auto p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl animate-float">🤖</div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground font-mono">
                  AI Narrator whispers:
                </p>
                <p className="text-sm text-accent">
                  {selectedAnswer === null
                    ? "Pick something, we don't have all day..."
                    : "Interesting choice... very interesting 🤔"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Questions;
