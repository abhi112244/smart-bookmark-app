"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) console.error("Error:", error.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
