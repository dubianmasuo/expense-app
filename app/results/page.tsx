"use client";

import ResultSection from "@/components/result-section";
import { useExpense } from "@/context/expense-context";

export default function ResultsPage() {
  const {
    rules,
    validInvoices,
    invalidInvoices,
    selectedInvoices,
    validButUnselected,
    recommendedAmount,
    remainingBudget,
  } = useExpense();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Results</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              推荐结果
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              当前页面已基于共享票据数据和规则动态计算结果。新增、重复、超限或越界票据都会实时影响结果分组。
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/invoices"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
            >
              返回票据录入
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
            >
              返回工作台
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">预算上限</p>
            <p className="mt-3 text-2xl font-semibold">¥{rules.budgetLimit}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">推荐提交金额</p>
            <p className="mt-3 text-2xl font-semibold">¥{recommendedAmount}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">剩余额度</p>
            <p className="mt-3 text-2xl font-semibold">¥{remainingBudget}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">合规票据数</p>
            <p className="mt-3 text-2xl font-semibold">{validInvoices.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">不合规票据数</p>
            <p className="mt-3 text-2xl font-semibold">{invalidInvoices.length}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <ResultSection
            title="推荐提交票据"
            description="以下票据符合当前规则，且组合后的总金额不超过限额并尽量接近预算。"
            invoices={selectedInvoices}
            emptyText="暂无可推荐票据。"
          />

          <ResultSection
            title="合规但未纳入本次推荐"
            description="这些票据本身合规，但由于预算限制，本次未被纳入推荐组合。"
            invoices={validButUnselected}
            emptyText="当前所有合规票据都已被纳入推荐。"
          />

          <ResultSection
            title="不合规票据"
            description="以下票据未通过规则校验，请根据提示原因进行修改或剔除。"
            invoices={invalidInvoices}
            emptyText="当前没有不合规票据。"
          />
        </div>
      </div>
    </main>
  );
}