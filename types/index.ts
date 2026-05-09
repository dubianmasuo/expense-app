export type InvoiceCategory =
  | "餐饮"
  | "交通"
  | "住宿"
  | "办公"
  | "其他";

export interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  amount: number;
  category: InvoiceCategory;
  vendor: string;
  description: string;
}

export interface RuleConfig {
  budgetLimit: number;
  maxPerInvoice: number;
  dateFrom: string;
  dateTo: string;
  allowedCategories: InvoiceCategory[];
}