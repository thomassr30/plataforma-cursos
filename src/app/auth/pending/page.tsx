import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2 } from "lucide-react";

export default async function PendingPage({ searchParams }: { searchParams: Promise<{ registered?: string }> }) {
  const { registered } = await searchParams;
  const justRegistered = registered === "1";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                justRegistered ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {justRegistered ? <CheckCircle2 className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
            </div>
          </div>
          <CardTitle className="text-2xl">
            {justRegistered ? "¡Cuenta creada!" : "Cuenta pendiente de aprobación"}
          </CardTitle>
          <CardDescription>
            {justRegistered
              ? "Tu cuenta fue creada correctamente. Está pendiente de aprobación por parte del administrador."
              : "Tu cuenta aún no ha sido habilitada. Contacta al administrador para que active tu acceso."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-muted/60 rounded-lg p-4 text-sm text-left">
            <p className="font-medium mb-2">¿Qué sigue?</p>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              <li>El administrador revisará tu solicitud.</li>
              <li>Cuando se apruebe, recibirás acceso completo a la plataforma.</li>
              <li>Vuelve a iniciar sesión cuando te avisen.</li>
            </ol>
          </div>
          <Button asChild className="w-full">
            <Link href="/auth/login">Volver al inicio de sesión</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
