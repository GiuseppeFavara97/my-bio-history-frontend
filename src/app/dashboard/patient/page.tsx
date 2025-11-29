import { formatEUR } from "@/lib/formatCurrency";

export default function BusinessDashboardPage() {
    const monthlyRevenue = 8745.5;
    const ordersToday = 12;
    const conversion = 3.8;

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Pannello Business</h2>
                <p className="text-sm text-slate-500">Statistiche e operazioni per la tua attività.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white border rounded">
                    <div className="text-sm text-slate-500">Ricavo mese</div>
                    <div className="text-xl font-bold">{formatEUR(monthlyRevenue)}</div>
                </div>
                <div className="p-4 bg-white border rounded">
                    <div className="text-sm text-slate-500">Ordini oggi</div>
                    <div className="text-xl font-bold">{ordersToday}</div>
                </div>
                <div className="p-4 bg-white border rounded">
                    <div className="text-sm text-slate-500">Conversione</div>
                    <div className="text-xl font-bold">{conversion}%</div>
                </div>
            </div>

            <section className="bg-white border rounded p-4">
                <h3 className="font-medium mb-3">Ultimi ordini</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>Ordine #1023</span>
                        <span className="text-slate-500">{formatEUR(49.9)}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Ordine #1022</span>
                        <span className="text-slate-500">{formatEUR(19.0)}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Ordine #1021</span>
                        <span className="text-slate-500">{formatEUR(129.99)}</span>
                    </li>
                </ul>
            </section>
        </div>
    );
}