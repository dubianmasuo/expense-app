export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 md:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
            Expense Compliance Assistant
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            报销合规助手
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl">
            自动校验票据合规性，识别不合规项，并在预算范围内推荐最优提交组合。
            帮助员工和财务减少人工核对、降低退单概率、提升报销处理效率。
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              进入工作台
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              查看功能
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4" id="features">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">票据集中录入</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              统一录入发票编号、日期、金额、类别和说明，快速建立报销清单。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">自动合规校验</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              根据报销规则自动识别重复票据、金额超限、类别不符和日期越界等问题。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">智能推荐组合</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              仅基于合规票据，推荐总金额不超过预算且最接近限额的提交方案。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">结果解释清晰</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              清楚展示每张票据为何被选中、未选中或被判定为不合规，方便复核与沟通。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}