import type { Place } from "@/types/travel";

interface TravelMapProps {
  places: Place[];
  selectedPlaceId: string | null;
  onSelectPlace: (placeId: string) => void;
}

export function TravelMap({
  places,
  selectedPlaceId,
  onSelectPlace,
}: TravelMapProps) {
  const bounds = getBounds(places);
  const selectedPlace =
    places.find((place) => place.id === selectedPlaceId) ?? places[0];

  return (
    <section className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Map
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            景点地图
          </h2>
        </div>
        <p className="text-sm text-zinc-500">{places.length} markers</p>
      </div>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200 bg-[linear-gradient(135deg,#ecfeff,#f8fafc_45%,#fef3c7)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(20,184,166,0.20),transparent_28%),radial-gradient(circle_at_70%_65%,rgba(245,158,11,0.18),transparent_30%)]" />
        <div className="absolute left-6 top-6 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-zinc-600 shadow-sm">
          Mock Map Mode
        </div>

        {places.map((place, index) => {
          const position = getPosition(place, bounds);
          const selected = place.id === selectedPlace?.id;

          return (
            <button
              key={place.id}
              type="button"
              onClick={() => onSelectPlace(place.id)}
              className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold shadow-lg transition ${
                selected
                  ? "bg-zinc-950 text-white ring-4 ring-teal-200"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              title={place.name}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {selectedPlace ? (
        <div className="mt-5 rounded-3xl bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-teal-700">
            {selectedPlace.category}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-zinc-950">
            {selectedPlace.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {selectedPlace.description}
          </p>
        </div>
      ) : null}
    </section>
  );
}

function getBounds(places: Place[]) {
  const latitudes = places.map((place) => place.location.latitude);
  const longitudes = places.map((place) => place.location.longitude);

  return {
    minLat: Math.min(...latitudes),
    maxLat: Math.max(...latitudes),
    minLng: Math.min(...longitudes),
    maxLng: Math.max(...longitudes),
  };
}

function getPosition(place: Place, bounds: ReturnType<typeof getBounds>) {
  const lngRange = bounds.maxLng - bounds.minLng || 1;
  const latRange = bounds.maxLat - bounds.minLat || 1;

  return {
    x: 12 + ((place.location.longitude - bounds.minLng) / lngRange) * 76,
    y: 88 - ((place.location.latitude - bounds.minLat) / latRange) * 76,
  };
}
