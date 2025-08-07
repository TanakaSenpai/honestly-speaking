"use client";
import { useState } from "react";
import { useSupabase } from "@/components/Providers";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { supabase } = useSupabase();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (tab === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleGuest() {
    // Guest logic can be expanded later
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div className="bg-background rounded-2xl shadow-neon p-8 w-full max-w-md relative animate-bounce-in">
        <button
          className="absolute top-3 right-3 text-xl hover:text-accent transition"
          onClick={onClose}
          aria-label="Close"
        >
          ✖️
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold neon-glow mb-2">
            {tab === "login"
              ? "Sign In to Get Roasted"
              : "Register for the Roast"}
          </h2>
          <p className="text-foreground/80 text-sm">
            {tab === "login"
              ? "Enter your email to unlock your chaos."
              : "Create an account to save your weirdest fragments."}
          </p>
        </div>
        <div className="flex justify-center mb-4 gap-2">
          <button
            className={`px-4 py-2 rounded-full font-bold transition ${
              tab === "login"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => setTab("login")}
            disabled={tab === "login"}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-full font-bold transition ${
              tab === "register"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => setTab("register")}
            disabled={tab === "register"}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-muted text-foreground border border-border focus:ring-2 focus:ring-primary outline-none transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded bg-muted text-foreground border border-border focus:ring-2 focus:ring-primary outline-none transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-destructive text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full neon-button py-2 text-lg font-bold mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Loading..." : tab === "login" ? "Sign In" : "Register"}
          </button>
        </form>
        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <button
          className="w-full neon-button py-2 text-lg font-bold flex items-center justify-center gap-2 mb-2"
          onClick={handleGoogle}
          disabled={loading}
        >
          <span>Sign in with Google</span> <span>🔮</span>
        </button>
        <button
          className="w-full bg-muted text-foreground border border-border rounded py-2 font-bold hover:bg-accent hover:text-accent-foreground transition"
          onClick={handleGuest}
          disabled={loading}
        >
          Continue as Guest
        </button>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          <span>We promise not to judge (much)... unless you want us to.</span>
        </div>
      </div>
    </div>
  );
}
