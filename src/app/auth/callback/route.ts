import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "signup" | "magiclink" | "recovery" | "invite" | "email" | null;
  const next = searchParams.get("redirectTo") ?? "/dashboard";

  const supabase = await createClient();

  // 1) Flujo OAuth o magic link con code
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
    return NextResponse.redirect(`${origin}/auth/login?error=oauth_failed`);
  }

  // 2) Flujo email confirmation con token_hash
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      // Si es recovery → mandar a página de reset
      if (type === "recovery") return NextResponse.redirect(`${origin}/auth/reset-password`);
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(`${origin}/auth/login?error=verify_failed`);
  }

  return NextResponse.redirect(`${origin}/auth/login?error=missing_params`);
}
