import Link from "next/link";

import { Command } from "lucide-react";
import { RegisterForm } from "./components/register-form";

export default function Register() {
    return (
        <div className="flex h-dvh   ">
            <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
                <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
                    <div className="space-y-4 text-center">
                        <div className="font-medium tracking-tight">Register</div>
                        <div className="text-muted-foreground mx-auto max-w-xl">
                            Fill in your details below. We promise not to quiz you about your first pet&apos;s name (this time).
                        </div>
                    </div>
                    <div className="space-y-4">
                        <RegisterForm />
                        <p className="text-muted-foreground text-center text-xs">
                            Already have an account?{" "}
                            <Link href="login" className="text-primary">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            
        </div>
    );
}