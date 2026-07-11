import type { DayPlan, Place } from "@/types/travel";

interface DayTimelineProps {
  itinerary: DayPlan[];
  places: Place[];
}

export function DayTimeline({ itinerary, places }: DayTimelineProps) {
  const placeNameById = new Map(places.map((place) => [place.id, place.name]));

  return (
    <section className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Itinerary
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            每日路线
          </h2>
        </div>
        <p className="text-sm text-zinc-500">
          {itinerary.length} 天 · {places.length} 个地点
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {itinerary.map((dayPlan) => (
          <article
            key={dayPlan.day}
            className="relative rounded-3xl border border-zinc-100 bg-zinc-50/70 p-5 pl-6"
          >
            <div className="absolute bottom-5 left-0 top-5 w-1 rounded-r-full bg-teal-400" />
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-teal-700">
                  Day {dayPlan.day}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-zinc-950">
                  {dayPlan.title}
                </h3>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-500 ring-1 ring-zinc-200">
                {dayPlan.places.length} stops
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
              {dayPlan.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-zinc-700">
              {dayPlan.places.map((placeId, index) => (
                <span key={placeId} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1 font-medium shadow-sm ring-1 ring-zinc-200">
                    {placeNameById.get(placeId) ?? placeId}
                  </span>
                  {index < dayPlan.places.length - 1 ? (
                    <span className="text-teal-500">→</span>
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
