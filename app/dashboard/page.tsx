"use client";

import RulePanel from "@/components/rule-panel";
import SummaryCards from "@/components/summary-cards";
import { useExpense } from "@/context/expense-context";

export default function DashboardPage() {
  const {
    invoices,
    rules,
    updateRules,
    validInvoices,
    invalidInvoices,
    recommendedAmount,
    remainingBudget,
  } = useExpense();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              报销工作台
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              当前页面的统计数据已经基于真实票据和规则动态计算，不再是静态写死的展示值。
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
            >
              返回首页
            </a>
            <a
              href="/invoices"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
            >
              去录入票据
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <RulePanel
            rules={rules}
            onChangeRules={updateRules}
          />

          <div className="space-y-6">
            <SummaryCards
              totalInvoices={invoices.length}
              validInvoices={validInvoices.length}
              invalidInvoices={invalidInvoices.length}
              recommendedAmount={recommendedAmount}
              remainingBudget={remainingBudget}
              budgetLimit={rules.budgetLimit}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                当前进展
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                你已经完成了共享状态、票据录入、合规校验、动态统计和推荐分组。下一步如果继续升级，
                可以加入规则编辑、删除票据、持久化存储和更优的组合算法。
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/invoices"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
                >
                  继续录入票据
                </a>
                <a
                  href="/results"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
                >
                  查看结果页
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}