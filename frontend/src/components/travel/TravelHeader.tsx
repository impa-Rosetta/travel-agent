import type { TravelGuide } from "@/types/travel";

interface TravelHeaderProps {
  guide: TravelGuide;
}

export function TravelHeader({ guide }: TravelHeaderProps) {
  return (
    <header className="overflow-hidden rounded-[2rem] border border-white/70 bg-zinc-950 text-white shadow-xl shadow-zinc-900/10">
      <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
            {guide.country} · {guide.duration} 天旅行方案
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
            {guide.destination}旅行攻略
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
            {guide.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-teal-50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
          <p className="text-sm text-zinc-300">当前原型</p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-teal-200">
                Destination
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {guide.destination}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-teal-200">
                Duration
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {guide.duration} Days
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-teal-200">
                Places
              </dt>
              <dd className="mt-1 text-2xl font-semibold">
                {guide.places.length} Stops
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
