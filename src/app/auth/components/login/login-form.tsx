"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email({ message: "Inserisci un indirizzo email valido." }),
    password: z.string().min(1, { message: "La password è obbligatoria." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginFormValues) {
        setLoading(true);
        setError(null);

        try {
            const trimmedEmail = values.email.trim();
            const rawPassword = values.password;

            console.log("[Login] Tentativo login con:", {
                url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                email: `${trimmedEmail.substring(0, 3)}********`,
                emailLength: trimmedEmail.length,
            });

            const data = await login(trimmedEmail, rawPassword);
            
            const role = data?.user?.role;
            if (!role) throw new Error("Ruolo non trovato nella risposta");

            const dashboardPath = `/dashboard/${role.toLowerCase()}`;
            console.log(`[Login] Successo, reindirizzamento a ${dashboardPath}`);
            router.push(dashboardPath);

        } catch (err: any) {
            console.error("[Login] Errore:", err);
            const status = err.response?.status;
            const backendMsg = err.response?.data?.message || err.response?.data?.error;

            if (status === 401) {
                setError(backendMsg || "Email o password non corretti (o account non verificato)");
            } else {
                setError(backendMsg || "Si è verificato un errore durante l'accesso");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-md border border-red-100">
                        {error}
                    </div>
                )}
                
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="nome@esempio.it" 
                                    {...field} 
                                    autoComplete="email"
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    {...field} 
                                    autoComplete="current-password"
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Accesso in corso...
                        </>
                    ) : (
                        "Accedi"
                    )}
                </Button>
            </form>
        </Form>
    );
}