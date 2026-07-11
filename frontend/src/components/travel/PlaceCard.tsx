import type { Place } from "@/types/travel";

interface PlaceCardProps {
  place: Place;
  index: number;
  imageUrl?: string;
  selected?: boolean;
  onSelect?: (placeId: string) => void;
}

const categoryLabel: Record<string, string> = {
  temple: "寺院",
  shrine: "神社",
  "historic-street": "历史街区",
  district: "街区",
  food: "美食",
  nature: "自然",
  landmark: "地标",
};

export function PlaceCard({
  place,
  index,
  imageUrl,
  selected = false,
  onSelect,
}: PlaceCardProps) {
  return (
    <article
      className={`group cursor-pointer overflow-hidden rounded-[1.5rem] border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        selected ? "border-teal-500 ring-4 ring-teal-100" : "border-zinc-200/80"
      }`}
      onClick={() => onSelect?.(place.id)}
    >
      {imageUrl ? (
        <div
          className="h-36 bg-zinc-200 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : null}
      <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
              {index}
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
              {categoryLabel[place.category] ?? place.category}
            </p>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-zinc-950">
            {place.name}
          </h3>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          {place.bestTime}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {place.description}
      </p>
      <dl className="mt-5 grid gap-3 text-sm text-zinc-700">
        <div className="rounded-2xl bg-zinc-50 p-3">
          <dt className="text-xs font-medium text-zinc-500">推荐停留</dt>
          <dd className="mt-1 font-semibold text-zinc-950">
            {place.recommendedDuration}
          </dd>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-3">
          <dt className="text-xs font-medium text-zinc-500">门票信息</dt>
          <dd className="mt-1 leading-6">{place.ticketInfo}</dd>
        </div>
      </dl>
      </div>
    </article>
  );
}
