"use client";

import { useMemo, useState } from "react";
import InvoiceForm from "@/components/invoice-form";
import InvoiceTable from "@/components/invoice-table";
import { useExpense } from "@/context/expense-context";

export default function InvoicesPage() {
  const {
    invoices,
    validationMap,
    selectedInvoices,
    deleteInvoice,
  } = useExpense();

  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

  const selectedIds = new Set(selectedInvoices.map((invoice) => invoice.id));

  const editingInvoice =
    invoices.find((invoice) => invoice.id === editingInvoiceId) ?? null;

  const tableRows = invoices.map((invoice) => {
    const validation = validationMap.get(invoice.id);

    let status: "合规" | "不合规" | "已推荐" | "未选中" = "合规";

    if (validation && !validation.isValid) {
      status = "不合规";
    } else if (selectedIds.has(invoice.id)) {
      status = "已推荐";
    } else {
      status = "未选中";
    }

    return {
      id: invoice.id,
      invoiceNo: invoice.invoiceNo,
      date: invoice.date,
      amount: invoice.amount,
      category: invoice.category,
      vendor: invoice.vendor,
      status,
      reasons: validation?.reasons ?? [],
    };
  });

  function handleEditInvoice(invoiceId: string) {
    setEditingInvoiceId(invoiceId);
  }

  function handleFinishEditing() {
    setEditingInvoiceId(null);
  }

  function handleDeleteInvoice(invoiceId: string) {
    if (editingInvoiceId === invoiceId) {
      setEditingInvoiceId(null);
    }

    deleteInvoice(invoiceId);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Invoices</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              票据录入
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              这里已经支持新增、编辑和删除票据，并根据当前规则自动更新状态与推荐结果。
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
            >
              返回工作台
            </a>
            <a
              href="/results"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
            >
              查看推荐结果
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <InvoiceForm
            editingInvoice={editingInvoice}
            onFinishEditing={handleFinishEditing}
          />
          <InvoiceTable
            invoices={tableRows}
            onEditInvoice={handleEditInvoice}
            onDeleteInvoice={handleDeleteInvoice}
          />
        </div>
      </div>
    </main>
  );
}