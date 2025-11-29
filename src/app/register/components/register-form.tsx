"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z
    .object({
        name: z.string().min(1, { message: "Inserisci il tuo nome." }),
        email: z.string().email({ message: "Inserisci un'email valida." }),
        password: z.string().min(6, { message: "La password deve avere almeno 6 caratteri." }),
        confirmPassword: z.string().min(6, { message: "Conferma la password." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Le password non corrispondono.",
        path: ["confirmPassword"],
    });

export function RegisterForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name?.trim(),
                    email: data.email.trim(),
                    password: data.password,
                }),
            });

            const payload = await res.json().catch(() => null);

            if (!res.ok) {
                toast.error(payload?.message || payload?.error || "Registrazione fallita.");
                return;
            }

            toast.success("Registrazione completata. Reindirizzamento al login...");
            router.push("/login");
        } catch (err) {
            toast.error("Errore di rete. Riprova più tardi.");
            console.error(err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input id="name" type="text" placeholder="Mario Rossi" autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Indirizzo email</FormLabel>
                            <FormControl>
                                <Input id="email" type="email" placeholder="tuo@esempio.com" autoComplete="email" {...field} />
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
                                <Input id="password" type="password" placeholder="••••••••" autoComplete="new-password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conferma password</FormLabel>
                            <FormControl>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Registrazione in corso..." : "Registrati"}
                </Button>
            </form>
        </Form>
    );
}