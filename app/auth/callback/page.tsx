import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CallbackPage() {
  const supabase = await createClient();

  await supabase.auth.getUser();

  redirect("/dashboard");
}
