"use client";

const STORAGE_KEY = "expense-app-data";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { initialInvoices, defaultRules } from "@/lib/mock-data";
import { recommendInvoices } from "@/lib/recommend";
import { validateInvoices } from "@/lib/validate";
import { Invoice, InvoiceCategory, RuleConfig } from "@/types";

type NewInvoiceInput = {
  invoiceNo: string;
  date: string;
  amount: number;
  category: InvoiceCategory;
  vendor: string;
  description: string;
};

type ExpenseContextValue = {
  invoices: Invoice[];
  rules: RuleConfig;
  addInvoice: (invoice: NewInvoiceInput) => void;
  updateInvoice: (invoiceId: string, invoice: NewInvoiceInput) => void;
  deleteInvoice: (invoiceId: string) => void;
  updateRules: (nextRules: RuleConfig) => void;
  validationMap: Map<string, { isValid: boolean; reasons: string[] }>;
  validInvoices: Invoice[];
  invalidInvoices: Array<Invoice & { reasons: string[] }>;
  selectedInvoices: Invoice[];
  validButUnselected: Invoice[];
  recommendedAmount: number;
  remainingBudget: number;
};

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  // 先用稳定默认值，保证服务端和客户端第一次渲染一致
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [rules, setRules] = useState<RuleConfig>(defaultRules);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  // 组件挂载后，再从 localStorage 恢复
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setHasLoadedStorage(true);
        return;
      }

      const parsed = JSON.parse(stored);

      if (parsed.invoices) {
        setInvoices(parsed.invoices);
      }

      if (parsed.rules) {
        setRules(parsed.rules);
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  // 等读取完成后，再开始持久化，避免一上来把本地数据覆盖掉
  useEffect(() => {
    if (!hasLoadedStorage) return;

    try {
      const data = {
        invoices,
        rules,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [invoices, rules, hasLoadedStorage]);

  function addInvoice(invoice: NewInvoiceInput) {
    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      ...invoice,
    };

    setInvoices((prev) => [newInvoice, ...prev]);
  }

  function updateInvoice(invoiceId: string, invoice: NewInvoiceInput) {
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === invoiceId
          ? {
              ...item,
              ...invoice,
            }
          : item
      )
    );
  }

  function deleteInvoice(invoiceId: string) {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== invoiceId));
  }

  function updateRules(nextRules: RuleConfig) {
    setRules(nextRules);
  }

  const value = useMemo(() => {
    const validationResults = validateInvoices(invoices, rules);

    const validationMap = new Map(
      validationResults.map((item) => [
        item.invoiceId,
        {
          isValid: item.isValid,
          reasons: item.reasons,
        },
      ])
    );

    const validInvoices = invoices.filter(
      (invoice) => validationMap.get(invoice.id)?.isValid
    );

    const invalidInvoices = invoices
      .filter((invoice) => !validationMap.get(invoice.id)?.isValid)
      .map((invoice) => ({
        ...invoice,
        reasons: validationMap.get(invoice.id)?.reasons ?? [],
      }));

    const recommendation = recommendInvoices(validInvoices, rules.budgetLimit);

    return {
      invoices,
      rules,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      updateRules,
      validationMap,
      validInvoices,
      invalidInvoices,
      selectedInvoices: recommendation.selected,
      validButUnselected: recommendation.validButUnselected,
      recommendedAmount: recommendation.totalSelectedAmount,
      remainingBudget: recommendation.remainingBudget,
    };
  }, [invoices, rules]);

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }

  return context;
}