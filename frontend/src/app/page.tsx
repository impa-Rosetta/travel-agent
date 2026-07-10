import { BudgetCard } from "@/components/travel/BudgetCard";
import { DayTimeline } from "@/components/travel/DayTimeline";
import { PlaceCard } from "@/components/travel/PlaceCard";
import { TravelHeader } from "@/components/travel/TravelHeader";
import { TravelTips } from "@/components/travel/TravelTips";
import sampleGuide from "@/data/sample-guide.json";
import type { TravelGuide } from "@/types/travel";

const guide = sampleGuide as TravelGuide;

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950">
      <div className="mx-auto max-w-6xl space-y-8">
        <TravelHeader guide={guide} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <DayTimeline itinerary={guide.itinerary} places={guide.places} />

            <section>
              <div className="mb-5">
                <p className="text-sm font-medium text-teal-700">Places</p>
                <h2 className="mt-1 text-2xl font-semibold text-zinc-950">
                  景点卡片
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {guide.places.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
            <BudgetCard budget={guide.budget} />
            <TravelTips tips={guide.tips} />
          </aside>
        </div>
      </div>
    </main>
  );
}
