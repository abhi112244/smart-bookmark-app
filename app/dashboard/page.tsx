import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.user?.email}</p>
    </div>
  );
}
