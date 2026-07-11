interface TravelTipsProps {
  tips: string[];
}

export function TravelTips({ tips }: TravelTipsProps) {
  return (
    <section className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
        Tips
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-zinc-950">旅行建议</h2>
      <ul className="mt-6 space-y-4">
        {tips.map((tip, index) => (
          <li
            key={tip}
            className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 text-sm leading-6 text-zinc-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">
              {index + 1}
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
