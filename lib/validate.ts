import { Invoice, RuleConfig } from "@/types";

export type ValidationResult = {
  invoiceId: string;
  isValid: boolean;
  reasons: string[];
};

export function validateInvoices(
  invoices: Invoice[],
  rules: RuleConfig
): ValidationResult[] {
  const invoiceNoCount = new Map<string, number>();

  for (const invoice of invoices) {
    const current = invoiceNoCount.get(invoice.invoiceNo) ?? 0;
    invoiceNoCount.set(invoice.invoiceNo, current + 1);
  }

  return invoices.map((invoice) => {
    const reasons: string[] = [];

    if (!invoice.invoiceNo.trim()) {
      reasons.push("缺少发票编号");
    }

    if (!invoice.date) {
      reasons.push("缺少日期");
    }

    if (!invoice.amount || invoice.amount <= 0) {
      reasons.push("金额无效");
    }

    if (!rules.allowedCategories.includes(invoice.category)) {
      reasons.push("类别不允许报销");
    }

    if (invoice.amount > rules.maxPerInvoice) {
      reasons.push("超过单张报销上限");
    }

    if (invoice.date < rules.dateFrom || invoice.date > rules.dateTo) {
      reasons.push("不在可报销日期范围内");
    }

    if ((invoiceNoCount.get(invoice.invoiceNo) ?? 0) > 1) {
      reasons.push("发票编号重复");
    }

    return {
      invoiceId: invoice.id,
      isValid: reasons.length === 0,
      reasons,
    };
  });
}