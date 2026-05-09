type SummaryCardsProps = {
  totalInvoices: number;
  validInvoices: number;
  invalidInvoices: number;
  recommendedAmount: number;
  remainingBudget: number;
  budgetLimit: number;
};

export default function SummaryCards({
  totalInvoices,
  validInvoices,
  invalidInvoices,
  recommendedAmount,
  remainingBudget,
  budgetLimit,
}: SummaryCardsProps) {
  const cards = [
    { label: "票据总数", value: totalInvoices },
    { label: "合规票据数", value: validInvoices },
    { label: "不合规票据数", value: invalidInvoices },
    { label: "预算上限", value: `¥${budgetLimit}` },
    { label: "推荐提交金额", value: `¥${recommendedAmount}` },
    { label: "剩余额度", value: `¥${remainingBudget}` },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}