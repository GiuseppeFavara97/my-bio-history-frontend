export function formatEUR(value: number | bigint | string) {
    const num = typeof value === "string" ? parseFloat(value) : Number(value ?? 0);
    return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(num);
}