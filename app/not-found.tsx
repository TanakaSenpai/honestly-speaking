import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-gaming relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-float"></div>
      <div className="absolute inset-0 bg-gradient-cyber opacity-10"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <Card className="cyber-card max-w-2xl mx-auto p-8">
          <div className="space-y-6">
            <h1
              className="text-6xl md:text-8xl font-bold mb-4 glitch-text neon-glow"
              data-text="404"
            >
              404
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-foreground/90 leading-relaxed">
              Looks like this fragment got lost in the digital void. The AI
              narrator is confused and slightly disappointed.
            </p>

            <div className="mt-8">
              <Link href="/">
                <Button className="neon-button text-lg px-8 py-4 text-primary-foreground font-bold">
                  Return to Reality 🏠
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
