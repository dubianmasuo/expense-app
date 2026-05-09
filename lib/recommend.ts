import { Invoice } from "@/types";

export type RecommendResult = {
  selected: Invoice[];
  validButUnselected: Invoice[];
  totalSelectedAmount: number;
  remainingBudget: number;
};

export function recommendInvoices(
  validInvoices: Invoice[],
  budgetLimit: number
): RecommendResult {
  const sorted = [...validInvoices].sort((a, b) => b.amount - a.amount);

  const selected: Invoice[] = [];
  let total = 0;

  for (const invoice of sorted) {
    if (total + invoice.amount <= budgetLimit) {
      selected.push(invoice);
      total += invoice.amount;
    }
  }

  const selectedIds = new Set(selected.map((invoice) => invoice.id));
  const validButUnselected = validInvoices.filter(
    (invoice) => !selectedIds.has(invoice.id)
  );

  return {
    selected,
    validButUnselected,
    totalSelectedAmount: total,
    remainingBudget: budgetLimit - total,
  };
}