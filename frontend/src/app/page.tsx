"use client";

import { useState } from "react";
import { BudgetCard } from "@/components/travel/BudgetCard";
import { DayTimeline } from "@/components/travel/DayTimeline";
import { DownloadButtons } from "@/components/travel/DownloadButtons";
import { PlaceCard } from "@/components/travel/PlaceCard";
import { TravelHeader } from "@/components/travel/TravelHeader";
import { TravelMap } from "@/components/travel/TravelMap";
import { TravelRequestForm } from "@/components/travel/TravelRequestForm";
import { TravelTips } from "@/components/travel/TravelTips";
import type { BackendResponse } from "@/types/api";
import type { TravelGuide } from "@/types/travel";

export default function Home() {
  const [backendResponse, setBackendResponse] =
    useState<BackendResponse | null>(null);
  const [guide, setGuide] = useState<TravelGuide | null>(null);

  function handleBackendResponse(response: BackendResponse) {
    setBackendResponse(response);
    setGuide(response.data);
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
        <section className="mb-10 rounded-[2rem] border border-zinc-200/80 bg-white/80 p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                AI Travel Agent
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                从旅行需求开始生成攻略
              </h1>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                输入旅行需求后，Backend 会通过 Travel Workflow 调用工具、
                LLM 和结构化校验，生成可交互的旅游攻略网页。
              </p>
            </div>

            <TravelRequestForm onSubmit={handleBackendResponse} />
          </div>
        </section>

        {backendResponse ? (
          <section className="mb-10 rounded-[2rem] border border-teal-100 bg-teal-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Backend Response
            </p>
            <p className="mt-2 text-sm font-medium text-teal-950">
              {backendResponse.message}
            </p>
            <div className="mt-4 grid gap-3 text-sm text-teal-950 md:grid-cols-3">
              <p>状态：{backendResponse.status}</p>
              <p>目的地：{backendResponse.data.destination}</p>
              <p>国家/地区：{backendResponse.data.country}</p>
              <p>天数：{backendResponse.data.duration} 天</p>
              <p>
                总预算：{backendResponse.data.budget.total.toLocaleString("zh-CN")}
              </p>
              <p>景点数量：{backendResponse.data.places.length} 个</p>
              <p>
                标签：{backendResponse.data.tags.join("、") || "暂无标签"}
              </p>
            </div>
          </section>
        ) : null}

        {guide ? (
          <TravelGuideView guide={guide} />
        ) : (
          <section className="rounded-[2rem] border border-dashed border-zinc-300 bg-white/50 p-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              等待生成旅行攻略
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              填写上方表单后，页面会在不刷新的情况下展示由 Mock 数据驱动的
              TravelGuide 攻略，并显示 FastAPI 返回的结构化结果。
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

function TravelGuideView({ guide }: { guide: TravelGuide }) {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
    guide.places[0]?.id ?? null,
  );

  return (
    <>
      <TravelHeader guide={guide} />

      <section className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-10">
          <DayTimeline itinerary={guide.itinerary} places={guide.places} />
          <TravelMap
            places={guide.places}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={setSelectedPlaceId}
          />

          <section>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Places
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                  值得停留的地点
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-zinc-600">
                每个地点都来自同一份 TravelGuide 数据，未来可以直接替换为
                Agent 生成的结果。
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {guide.places.map((place, index) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  index={index + 1}
                  imageUrl={guide.placeImages?.[place.id]}
                  selected={selectedPlaceId === place.id}
                  onSelect={setSelectedPlaceId}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
          <BudgetCard budget={guide.budget} />
          <TravelTips tips={guide.tips} />
          <DownloadButtons guide={guide} />
        </aside>
      </section>

      <section className="mt-12 rounded-[2rem] border border-zinc-200/80 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-teal-700">Data Source</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Agent Workflow 驱动页面
            </h2>
          </div>
          <p className="text-sm leading-6 text-zinc-600 md:col-span-2">
            当前页面先接收用户输入，再通过 fetch 调用 FastAPI Backend。后端返回
            结构化 TravelGuide 后，前端直接使用这份 JSON 渲染地图、行程和下载内容。
          </p>
        </div>
      </section>
    </>
  );
}
