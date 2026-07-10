import type { TravelGuide } from "@/types/travel";

interface TravelHeaderProps {
  guide: TravelGuide;
}

export function TravelHeader({ guide }: TravelHeaderProps) {
  return (
    <header className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium text-teal-700">
        {guide.country} · {guide.duration} 天行程
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
        {guide.destination}旅行攻略
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600">
        {guide.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {guide.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800"
          >
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
}
