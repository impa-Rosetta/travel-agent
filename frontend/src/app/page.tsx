"use client";

import { useState } from "react";
import { BudgetCard } from "@/components/travel/BudgetCard";
import { DayTimeline } from "@/components/travel/DayTimeline";
import { PlaceCard } from "@/components/travel/PlaceCard";
import { TravelHeader } from "@/components/travel/TravelHeader";
import { TravelRequestForm } from "@/components/travel/TravelRequestForm";
import { TravelTips } from "@/components/travel/TravelTips";
import sampleGuide from "@/data/sample-guide.json";
import type { BackendResponse } from "@/types/api";
import type { TravelGuide } from "@/types/travel";

export default function Home() {
  const [backendResponse, setBackendResponse] =
    useState<BackendResponse | null>(null);
  const [guide, setGuide] = useState<TravelGuide | null>(null);

  function handleBackendResponse(response: BackendResponse) {
    setBackendResponse(response);
    setGuide(sampleGuide as TravelGuide);
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
                Day 7 打通 Frontend 和 FastAPI Backend。当前后端接收请求并返回
                JSON，未来会继续连接 Agent Workflow。
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
              <p>天数：{backendResponse.data.duration} 天</p>
              <p>人数：{backendResponse.data.travelers} 人</p>
              <p>
                预算：{backendResponse.data.budget.toLocaleString("zh-CN")}
              </p>
              <p>风格：{backendResponse.data.travelStyle}</p>
              <p>
                偏好：{backendResponse.data.preferences.join("、") || "未选择"}
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
              TravelGuide 原型，并显示 FastAPI 返回的请求结果。
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

function TravelGuideView({ guide }: { guide: TravelGuide }) {
  return (
    <>
      <TravelHeader guide={guide} />

      <section className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-10">
          <DayTimeline itinerary={guide.itinerary} places={guide.places} />

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
                <PlaceCard key={place.id} place={place} index={index + 1} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-8 xl:self-start">
          <BudgetCard budget={guide.budget} />
          <TravelTips tips={guide.tips} />
        </aside>
      </section>

      <section className="mt-12 rounded-[2rem] border border-zinc-200/80 bg-white/75 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-teal-700">Data Source</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Mock Agent 驱动页面
            </h2>
          </div>
          <p className="text-sm leading-6 text-zinc-600 md:col-span-2">
            当前页面先接收用户输入，再通过 fetch 调用 FastAPI Backend。后端返回
            请求确认结果后，前端继续使用示例 TravelGuide 展示页面。
          </p>
        </div>
      </section>
    </>
  );
}
