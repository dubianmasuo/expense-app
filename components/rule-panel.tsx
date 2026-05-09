"use client";

import { RuleConfig } from "@/types";

type RulePanelProps = {
  rules: RuleConfig;
  onChangeRules: (nextRules: RuleConfig) => void;
};

export default function RulePanel({
  rules,
  onChangeRules,
}: RulePanelProps) {
  function updateField<K extends keyof RuleConfig>(
    key: K,
    value: RuleConfig[K]
  ) {
    onChangeRules({
      ...rules,
      [key]: value,
    });
  }

  function toggleCategory(category: RuleConfig["allowedCategories"][number]) {
    const exists = rules.allowedCategories.includes(category);

    const nextCategories = exists
      ? rules.allowedCategories.filter((item) => item !== category)
      : [...rules.allowedCategories, category];

    onChangeRules({
      ...rules,
      allowedCategories: nextCategories,
    });
  }

  const allCategories: RuleConfig["allowedCategories"] = [
    "餐饮",
    "交通",
    "住宿",
    "办公",
    "其他",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">报销规则</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        这里已经升级为可编辑规则表单。修改后，统计、校验和推荐结果会实时联动。
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">
            报销总限额
          </label>
          <input
            type="number"
            value={rules.budgetLimit}
            onChange={(e) => updateField("budgetLimit", Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            单张票据上限
          </label>
          <input
            type="number"
            value={rules.maxPerInvoice}
            onChange={(e) =>
              updateField("maxPerInvoice", Number(e.target.value))
            }
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            可报销开始日期
          </label>
          <input
            type="date"
            value={rules.dateFrom}
            onChange={(e) => updateField("dateFrom", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            可报销结束日期
          </label>
          <input
            type="date"
            value={rules.dateTo}
            onChange={(e) => updateField("dateTo", e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">允许报销类别</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {allCategories.map((category) => {
              const active = rules.allowedCategories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}