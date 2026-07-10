import type { DayPlan, Place } from "@/types/travel";

interface DayTimelineProps {
  itinerary: DayPlan[];
  places: Place[];
}

export function DayTimeline({ itinerary, places }: DayTimelineProps) {
  const placeNameById = new Map(places.map((place) => [place.id, place.name]));

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium text-teal-700">Itinerary</p>
        <h2 className="mt-1 text-2xl font-semibold text-zinc-950">每日行程</h2>
      </div>

      <div className="mt-6 space-y-5">
        {itinerary.map((dayPlan) => (
          <article
            key={dayPlan.day}
            className="border-l-2 border-teal-200 pl-5"
          >
            <p className="text-sm font-semibold text-teal-700">
              Day {dayPlan.day}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-950">
              {dayPlan.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {dayPlan.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-700">
              {dayPlan.places.map((placeId, index) => (
                <span key={placeId} className="flex items-center gap-2">
                  <span className="rounded-full bg-zinc-100 px-3 py-1">
                    {placeNameById.get(placeId) ?? placeId}
                  </span>
                  {index < dayPlan.places.length - 1 ? (
                    <span className="text-zinc-400">→</span>
                  ) : null}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
