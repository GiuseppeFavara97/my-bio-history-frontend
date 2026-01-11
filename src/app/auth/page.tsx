import { Suspense } from "react";
import LoginRegister from "./components/login-register";

export default function AuthPage() {
    return (
        <Suspense fallback={null}>
            <LoginRegister />
        </Suspense>
    );
}
