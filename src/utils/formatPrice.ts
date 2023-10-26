export function formatPrice(value: string | number): string {
    return parseFloat(`${value}`).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
