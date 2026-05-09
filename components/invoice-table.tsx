type InvoiceRow = {
  id: string;
  invoiceNo: string;
  date: string;
  amount: number;
  category: string;
  vendor: string;
  status: "合规" | "不合规" | "已推荐" | "未选中";
  reasons?: string[];
};

type InvoiceTableProps = {
  invoices: InvoiceRow[];
  onEditInvoice: (invoiceId: string) => void;
  onDeleteInvoice: (invoiceId: string) => void;
};

function StatusBadge({ status }: { status: InvoiceRow["status"] }) {
  const styles: Record<InvoiceRow["status"], string> = {
    合规: "bg-emerald-50 text-emerald-700 border-emerald-200",
    不合规: "bg-rose-50 text-rose-700 border-rose-200",
    已推荐: "bg-slate-900 text-white border-slate-900",
    未选中: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function InvoiceTable({
  invoices,
  onEditInvoice,
  onDeleteInvoice,
}: InvoiceTableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">全部票据</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            你可以查看票据状态、异常原因，并编辑或删除已有票据。
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                发票编号
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                日期
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                金额
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                类别
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                商家
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                状态
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                原因
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">
                操作
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-800">
                  {invoice.invoiceNo}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-600">
                  {invoice.date}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-600">
                  ¥{invoice.amount}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-600">
                  {invoice.category}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-600">
                  {invoice.vendor}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-sm">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-sm text-slate-500">
                  {invoice.reasons && invoice.reasons.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {invoice.reasons.map((reason) => (
                        <span
                          key={reason}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="border-b border-slate-100 px-4 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEditInvoice(invoice.id)}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteInvoice(invoice.id)}
                      className="inline-flex items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}