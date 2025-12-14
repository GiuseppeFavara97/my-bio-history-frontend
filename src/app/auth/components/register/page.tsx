"use client";

import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import("./register-form").then((mod) => mod.RegisterForm), { ssr: false });

export default function Register({ setIsRegister }: { setIsRegister: (value: boolean) => void }) {
  return (
    <div className="flex h-dvh    ">
      <div className="bg-background flex w-full items-center justify-center   lg:w-2/3">
        <div className="w-full max-w-md space-y-10 p-2 outline rounded-2xl bg-gray-500/10 lg:p-5">
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
              <button
                onClick={() => setIsRegister(false)}
                className="text-primary cursor-pointer duration-300 hover:translate-x-1 hover:scale-110 hover:font-bold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
