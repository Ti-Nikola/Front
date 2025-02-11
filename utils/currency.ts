export function formatCurrency(amount: number | string): string {
  if (!amount) return '$0';
  return `$${Number(amount)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
