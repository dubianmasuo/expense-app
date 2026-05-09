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
  const budget = Math.round(budgetLimit * 100);
  const amounts = validInvoices.map((invoice) => Math.round(invoice.amount * 100));
  const n = validInvoices.length;

  const dp: boolean[][] = Array.from({ length: n + 1 }, () =>
    Array(budget + 1).fill(false)
  );

  const take: boolean[][] = Array.from({ length: n + 1 }, () =>
    Array(budget + 1).fill(false)
  );

  dp[0][0] = true;

  for (let i = 1; i <= n; i++) {
    const amount = amounts[i - 1];

    for (let sum = 0; sum <= budget; sum++) {
      if (dp[i - 1][sum]) {
        dp[i][sum] = true;
      }

      if (sum >= amount && dp[i - 1][sum - amount]) {
        dp[i][sum] = true;
        take[i][sum] = true;
      }
    }
  }

  let best = 0;

  for (let sum = budget; sum >= 0; sum--) {
    if (dp[n][sum]) {
      best = sum;
      break;
    }
  }

  const selected: Invoice[] = [];
  let currentSum = best;

  for (let i = n; i >= 1; i--) {
    if (take[i][currentSum]) {
      const invoice = validInvoices[i - 1];
      selected.push(invoice);
      currentSum -= amounts[i - 1];
    }
  }

  selected.reverse();

  const selectedIds = new Set(selected.map((invoice) => invoice.id));

  const validButUnselected = validInvoices.filter(
    (invoice) => !selectedIds.has(invoice.id)
  );

  return {
    selected,
    validButUnselected,
    totalSelectedAmount: best / 100,
    remainingBudget: (budget - best) / 100,
  };
}