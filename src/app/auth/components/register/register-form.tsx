"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { register as registerUser } from "@/lib/api/auth";
import { UserRole } from "@/Types/Types";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
    role: z.enum(["DOCTOR", "PATIENT"]),
    name: z.string().min(1, { message: "Inserisci il tuo nome." }),
    surname: z.string().min(1, { message: "Inserisci il tuo cognome." }),
    email: z.string().email({ message: "Inserisci un'email valida." }),
    password: z.string().min(6, { message: "La password deve avere almeno 6 caratteri." }),
    birthday: z.string().optional(),
    taxCode: z.string().optional(),
    phoneNumber: z.string().optional(),
    specialization: z.string().optional(),
    licenseNumber: z.string().optional(),
    place: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            role: "PATIENT",
            name: "",
            surname: "",
            email: "",
            password: "",
            birthday: "",
            taxCode: "",
            phoneNumber: "",
            specialization: "",
            licenseNumber: "",
            place: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const commonFields = {
                email: data.email.trim(),
                password: data.password,
                role: data.role,
            };

            const profileFields = {
                firstName: data.name,
                lastName: data.surname,
                birthday: data.birthday || null,
                taxCode: data.taxCode || null,
                phoneNumber: data.phoneNumber || null,
            };

            const payload = data.role === "DOCTOR" 
                ? { 
                    ...commonFields, 
                    doctor: { 
                        ...profileFields, 
                        specialization: data.specialization, 
                        licenseNumber: data.licenseNumber, 
                        place: data.place 
                    } 
                }
                : { 
                    ...commonFields, 
                    patient: profileFields 
                };

            const res = await registerUser(payload);
            const role = res?.user?.role || data.role;
            
            toast.success("Registrazione completata! Controlla la tua email.");
            router.push(`/auth/email-verification?role=${role}`);
        } catch (err: any) {
            console.error("[Register] Errore:", err);
            const errorMsg = err.response?.data?.error || err.response?.data?.message || "Errore di rete. Riprova più tardi.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ruolo</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleziona un ruolo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="PATIENT">Paziente</SelectItem>
                                    <SelectItem value="DOCTOR">Dottore</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mario" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cognome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Rossi" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="tuo@esempio.com" {...field} />
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
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data di nascita</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="taxCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Codice Fiscale</FormLabel>
                                <FormControl>
                                    <Input placeholder="CF..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefono</FormLabel>
                            <FormControl>
                                <Input placeholder="320..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.watch("role") === "DOCTOR" && (
                    <div className="space-y-4 border-t pt-4 mt-4">
                        <p className="text-sm font-semibold text-muted-foreground">Informazioni Professionali</p>
                        <FormField
                            control={form.control}
                            name="specialization"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Specializzazione</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Cardiologo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="licenseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numero Licenza</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="place"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Luogo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Trapani" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                )}

                <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registrazione in corso...
                        </>
                    ) : (
                        "Registrati"
                    )}
                </Button>
            </form>
        </Form>
    );
}
