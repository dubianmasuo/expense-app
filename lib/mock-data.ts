import { Invoice, RuleConfig } from "@/types";

export const defaultRules: RuleConfig = {
  budgetLimit: 1000,
  maxPerInvoice: 500,
  dateFrom: "2026-03-01",
  dateTo: "2026-03-31",
  allowedCategories: ["餐饮", "交通", "住宿", "办公"],
};

export const initialInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "FP2026001",
    date: "2026-03-01",
    amount: 120,
    category: "交通",
    vendor: "滴滴出行",
    description: "打车去客户现场",
  },
  {
    id: "2",
    invoiceNo: "FP2026002",
    date: "2026-03-03",
    amount: 260,
    category: "餐饮",
    vendor: "某餐厅",
    description: "商务午餐",
  },
  {
    id: "3",
    invoiceNo: "FP2026003",
    date: "2026-03-08",
    amount: 640,
    category: "住宿",
    vendor: "某酒店",
    description: "出差住宿",
  },
  {
    id: "4",
    invoiceNo: "FP2026004",
    date: "2026-03-10",
    amount: 120,
    category: "办公",
    vendor: "办公用品店",
    description: "文具采购",
  },
];