"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotSchema, type ForgotInput } from "@/validations/auth";
import { forgotPasswordAction } from "@/app/auth/actions";

export function ForgotForm() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: ForgotInput) {
    const fd = new FormData();
    fd.append("email", values.email);
    startTransition(async () => {
      const r = await forgotPasswordAction(fd);
      if (r?.error) toast.error(r.error);
      else {
        toast.success("Email enviado. Revisa tu bandeja.");
        setSent(true);
      }
    });
  }

  if (sent) {
    return (
      <div className="bg-success/10 text-success rounded-lg p-4 text-sm text-center">
        ✅ Te enviamos un enlace para restablecer tu contraseña.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Enviando..." : "Enviar enlace"}
        </Button>
      </form>
    </Form>
  );
}
