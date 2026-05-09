"use client";

import { useEffect, useState } from "react";
import { useExpense } from "@/context/expense-context";
import { Invoice, InvoiceCategory } from "@/types";

type FormState = {
  invoiceNo: string;
  date: string;
  amount: string;
  category: InvoiceCategory;
  vendor: string;
  description: string;
};

type InvoiceFormProps = {
  editingInvoice: Invoice | null;
  onFinishEditing: () => void;
};

const initialFormState: FormState = {
  invoiceNo: "",
  date: "",
  amount: "",
  category: "餐饮",
  vendor: "",
  description: "",
};

export default function InvoiceForm({
  editingInvoice,
  onFinishEditing,
}: InvoiceFormProps) {
  const { addInvoice, updateInvoice } = useExpense();
  const [form, setForm] = useState<FormState>(initialFormState);

  useEffect(() => {
    if (editingInvoice) {
      setForm({
        invoiceNo: editingInvoice.invoiceNo,
        date: editingInvoice.date,
        amount: String(editingInvoice.amount),
        category: editingInvoice.category,
        vendor: editingInvoice.vendor,
        description: editingInvoice.description,
      });
    } else {
      setForm(initialFormState);
    }
  }, [editingInvoice]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function buildPayload() {
    return {
      invoiceNo: form.invoiceNo.trim(),
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      vendor: form.vendor.trim(),
      description: form.description.trim(),
    };
  }

  function validateForm() {
    if (
      !form.invoiceNo.trim() ||
      !form.date ||
      !form.amount ||
      !form.vendor.trim()
    ) {
      alert("请先填写完整的发票编号、日期、金额和商家。");
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    const payload = buildPayload();

    if (editingInvoice) {
      updateInvoice(editingInvoice.id, payload);
      onFinishEditing();
    } else {
      addInvoice(payload);
    }

    setForm(initialFormState);
  }

  function handleReset() {
    setForm(initialFormState);
    onFinishEditing();
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        {editingInvoice ? "编辑票据" : "新增票据"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {editingInvoice
          ? "你正在编辑一条已有票据，保存后将直接更新列表和结果。"
          : "填写票据信息后可直接加入列表，系统会自动校验并更新推荐结果。"}
      </p>

      <form className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">
            发票编号
          </label>
          <input
            type="text"
            value={form.invoiceNo}
            onChange={(e) => updateField("invoiceNo", e.target.value)}
            placeholder="例如 FP2026001"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">日期</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">金额</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => updateField("amount", e.target.value)}
            placeholder="例如 128.50"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">类别</label>
          <select
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value as InvoiceCategory)
            }
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          >
            <option value="餐饮">餐饮</option>
            <option value="交通">交通</option>
            <option value="住宿">住宿</option>
            <option value="办公">办公</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">商家</label>
          <input
            type="text"
            value={form.vendor}
            onChange={(e) => updateField("vendor", e.target.value)}
            placeholder="例如 某酒店 / 某餐厅"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">说明</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="填写报销用途或场景"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90"
          >
            {editingInvoice ? "保存修改" : "添加票据"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
          >
            {editingInvoice ? "取消编辑" : "清空表单"}
          </button>
        </div>
      </form>
    </div>
  );
}