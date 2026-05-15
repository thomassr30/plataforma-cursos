"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema, forgotSchema } from "@/validations/auth";

export async function signInAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(", ") };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: traduceError(error.message) };
  }

  // Verificar que el usuario está activo
  if (data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_active")
      .eq("id", data.user.id)
      .single();

    if (!profile?.is_active) {
      // Cerrar sesión inmediatamente para evitar acceso
      await supabase.auth.signOut();
      redirect("/auth/pending");
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(", ") };
  }

  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: traduceError(error.message) };
  }

  // En vez de iniciar sesión, mandamos al usuario a la página de "pendiente"
  // ya que is_active = false por defecto.
  // Si Supabase creó sesión auto, la cerramos.
  await supabase.auth.signOut();
  redirect("/auth/pending?registered=1");
}

export async function forgotPasswordAction(formData: FormData) {
  const parsed = forgotSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { error: "Email no válido" };

  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/reset-password`,
  });

  if (error) return { error: traduceError(error.message) };
  return { ok: true };
}

function traduceError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email o contraseña incorrectos";
  if (m.includes("user already registered")) return "Este email ya está registrado. Inicia sesión.";
  if (m.includes("email not confirmed")) return "Confirma tu email antes de iniciar sesión.";
  if (m.includes("password should be")) return "La contraseña no cumple los requisitos mínimos.";
  if (m.includes("rate limit")) return "Demasiados intentos. Espera unos minutos.";
  return msg;
}
