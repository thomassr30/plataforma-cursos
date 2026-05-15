import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url, email, is_active")
    .eq("id", user.id)
    .single();

  // Si el usuario no está activo, cerramos sesión y mandamos a pendiente
  if (!profile?.is_active) {
    await supabase.auth.signOut();
    redirect("/auth/pending");
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboardHeader profile={profile ?? { full_name: null, avatar_url: null, email: user.email ?? "" }} />
      <main className="container py-8">{children}</main>
    </div>
  );
}
