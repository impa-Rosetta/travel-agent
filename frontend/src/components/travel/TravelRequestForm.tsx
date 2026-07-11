"use client";

import { useState } from "react";
import { travelRequest } from "@/lib/api";
import type { BackendResponse } from "@/types/api";
import type { TravelRequest } from "@/types/request";

interface TravelRequestFormProps {
  onSubmit: (response: BackendResponse) => void;
}

const preferenceOptions = ["文化探索", "美食旅行", "自然风光", "购物"];
const travelStyleOptions = ["轻松慢游", "经典打卡", "深度体验"];

const initialRequest: TravelRequest = {
  destination: "京都",
  duration: 3,
  travelers: 2,
  budget: 50000,
  preferences: ["文化探索", "美食旅行"],
  travelStyle: "轻松慢游",
};

export function TravelRequestForm({ onSubmit }: TravelRequestFormProps) {
  const [request, setRequest] = useState<TravelRequest>(initialRequest);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function updateField<K extends keyof TravelRequest>(
    field: K,
    value: TravelRequest[K],
  ) {
    setRequest((currentRequest) => ({
      ...currentRequest,
      [field]: value,
    }));
  }

  function togglePreference(preference: string) {
    setRequest((currentRequest) => {
      const preferences = currentRequest.preferences.includes(preference)
        ? currentRequest.preferences.filter((item) => item !== preference)
        : [...currentRequest.preferences, preference];

      return {
        ...currentRequest,
        preferences,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await travelRequest(request);
      onSubmit(response);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "请求失败，请稍后再试。";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm md:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          Travel Request
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
          输入你的旅行需求
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
          当前不会调用 AI。提交后会把用户需求发送给 FastAPI Backend，
          再由前端展示接口返回结果。
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">目的地</span>
          <input
            value={request.destination}
            onChange={(event) => updateField("destination", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="例如：京都"
            type="text"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">旅行天数</span>
          <input
            value={request.duration}
            onChange={(event) =>
              updateField("duration", Number(event.target.value))
            }
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            min={1}
            type="number"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">人数</span>
          <input
            value={request.travelers}
            onChange={(event) =>
              updateField("travelers", Number(event.target.value))
            }
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            min={1}
            type="number"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">预算</span>
          <input
            value={request.budget}
            onChange={(event) => updateField("budget", Number(event.target.value))}
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            min={0}
            type="number"
          />
        </label>
      </div>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium text-zinc-700">兴趣偏好</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {preferenceOptions.map((preference) => {
            const selected = request.preferences.includes(preference);

            return (
              <button
                key={preference}
                type="button"
                onClick={() => togglePreference(preference)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-teal-700 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {preference}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium text-zinc-700">旅行风格</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {travelStyleOptions.map((style) => {
            const selected = request.travelStyle === style;

            return (
              <button
                key={style}
                type="button"
                onClick={() => updateField("travelStyle", style)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                  selected
                    ? "border-teal-600 bg-teal-50 text-teal-800"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {isLoading ? "生成中..." : "生成旅行攻略"}
        </button>
        <p className="text-sm text-zinc-500">
          当前会调用 Backend API，并显示后端响应结果。
        </p>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
