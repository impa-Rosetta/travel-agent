interface TravelTipsProps {
  tips: string[];
}

export function TravelTips({ tips }: TravelTipsProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-teal-700">Tips</p>
      <h2 className="mt-1 text-2xl font-semibold text-zinc-950">旅行建议</h2>
      <ul className="mt-5 space-y-3">
        {tips.map((tip) => (
          <li key={tip} className="flex gap-3 text-sm leading-6 text-zinc-600">
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-teal-600" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
