"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register as registerUser } from "@/lib/api/auth";

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

export function RegisterForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
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

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            let payload;

            if (data.role === "DOCTOR") {
                payload = {
                    email: data.email.trim(),
                    password: data.password,
                    role: "DOCTOR",
                    doctor: {
                        firstName: data.name,
                        lastName: data.surname,
                        birthday: data.birthday,
                        taxCode: data.taxCode,
                        phoneNumber: data.phoneNumber,
                        specialization: data.specialization,
                        licenseNumber: data.licenseNumber,
                        place: data.place,
                    },
                };
            } else {
                payload = {
                    email: data.email.trim(),
                    password: data.password,
                    role: "PATIENT",
                    patient: {
                        firstName: data.name,
                        lastName: data.surname,
                        birthday: data.birthday,
                        taxCode: data.taxCode,
                        phoneNumber: data.phoneNumber,
                    },
                };
            }

            const res = await registerUser(payload);

            const role = res.user.role.toUpperCase();
            router.push(`/auth/email-verification?role=${role}`);
            toast.success("Registrazione completata!");
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Errore di rete. Riprova più tardi.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Ruolo */}
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ruolo</FormLabel>
                            <FormControl>
                                <select {...field} className="w-full p-2 border rounded">
                                    <option value="PATIENT">Paziente</option>
                                    <option value="DOCTOR">Dottore</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campi comuni */}
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

                {/* Campi solo per DOCTOR */}
                {form.watch("role") === "DOCTOR" && (
                    <>
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
                    </>
                )}

                <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Registrazione in corso..." : "Registrati"}
                </Button>
            </form>
        </Form>
    );
}
