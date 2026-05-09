type ResultInvoice = {
  id: string;
  invoiceNo: string;
  date: string;
  amount: number;
  category: string;
  vendor: string;
  reasons?: string[];
};

type ResultSectionProps = {
  title: string;
  description: string;
  invoices: ResultInvoice[];
  emptyText: string;
};

export default function ResultSection({
  title,
  description,
  invoices,
  emptyText,
}: ResultSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      {invoices.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          {emptyText}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {invoice.invoiceNo}
                    </p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600">
                      {invoice.category}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    日期：{invoice.date}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    商家：{invoice.vendor}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm text-slate-500">金额</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    ¥{invoice.amount}
                  </p>
                </div>
              </div>

              {invoice.reasons && invoice.reasons.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {invoice.reasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-700"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}