import type { Budget } from "@/types/travel";

interface BudgetCardProps {
  budget: Budget;
}

const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

export function BudgetCard({ budget }: BudgetCardProps) {
  const items = [
    ["交通", budget.transportation],
    ["住宿", budget.accommodation],
    ["餐饮", budget.food],
    ["门票", budget.ticket],
    ["其他", budget.other],
  ] as const;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-teal-700">Budget</p>
      <h2 className="mt-1 text-2xl font-semibold text-zinc-950">预算估算</h2>

      <dl className="mt-6 space-y-3">
        {items.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-6">
            <dt className="text-sm text-zinc-600">{label}</dt>
            <dd className="text-sm font-medium text-zinc-950">
              {currencyFormatter.format(value)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-zinc-200 pt-5">
        <div className="flex items-center justify-between gap-6">
          <span className="text-base font-semibold text-zinc-950">总预算</span>
          <span className="text-xl font-semibold text-teal-700">
            {currencyFormatter.format(budget.total)}
          </span>
        </div>
      </div>
    </section>
  );
}
