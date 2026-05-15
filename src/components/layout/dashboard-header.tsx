"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";

interface Props {
  profile: { full_name: string | null; avatar_url: string | null; email: string };
}

export function DashboardHeader({ profile }: Props) {
  const initials = (profile.full_name || profile.email)
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
          <div className="bg-primary text-primary-foreground w-9 h-9 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          Cursos Platform
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium">{profile.full_name || profile.email}</span>
            <span className="text-xs text-muted-foreground">{profile.email}</span>
          </div>
          <Avatar>
            {profile.avatar_url && <AvatarImage src={profile.avatar_url} alt={profile.full_name ?? "avatar"} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <form action="/auth/signout" method="post">
            <Button variant="ghost" size="icon" type="submit" aria-label="Cerrar sesión">
              <LogOut className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
