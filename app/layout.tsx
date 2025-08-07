import type { Metadata } from "next";
import "./globals.css";
import Providers, { SupabaseProvider } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Honestly Speaking... - Uncover Your Mess",
  description:
    "A wildly entertaining, sarcastic, borderline weird digital experience to uncover your personality fragments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-gaming">
        <SupabaseProvider>
          <Providers>{children}</Providers>
        </SupabaseProvider>
      </body>
    </html>
  );
}
