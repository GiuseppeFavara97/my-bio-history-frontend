export default function EmailVerification() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg max-w-md text-center text-black dark:text-white">
                <h1 className="text-2xl font-bold mb-4">
                    Controlla la tua email
                </h1>
                <p>
                    Ti abbiamo inviato un link per verificare il tuo indirizzo email.
                    <br />
                    Una volta verificato, potrai accedere.
                </p>
            </div>
        </div>
    );
}