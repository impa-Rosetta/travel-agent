import type { Place } from "@/types/travel";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
            {place.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-zinc-950">
            {place.name}
          </h3>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
          {place.bestTime}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {place.description}
      </p>
      <dl className="mt-5 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
        <div>
          <dt className="font-medium text-zinc-950">建议停留</dt>
          <dd className="mt-1">{place.recommendedDuration}</dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-950">门票信息</dt>
          <dd className="mt-1">{place.ticketInfo}</dd>
        </div>
      </dl>
    </article>
  );
}
