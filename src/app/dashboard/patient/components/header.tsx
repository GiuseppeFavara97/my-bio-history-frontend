"use client";

export default function Header({ setOpen }: { setOpen: (s: boolean) => void }) {
    return (
        <header className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <button className="sm:hidden p-2 rounded-md hover:bg-slate-100" onClick={() => setOpen((s) => !s)} aria-label="Toggle sidebar">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-semibold">Business</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-600">Ciao, Partner</div>
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                </div>
            </div>
        </header>
    );
}