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
    <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="container flex h-14 sm:h-16 items-center justify-between gap-2">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-base sm:text-lg min-w-0">
          <div className="bg-primary text-primary-foreground w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="truncate">Cursos Platform</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium truncate max-w-[180px]">{profile.full_name || profile.email}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[180px]">{profile.email}</span>
          </div>
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
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
