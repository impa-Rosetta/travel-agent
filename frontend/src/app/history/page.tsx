"use client";

import { useEffect, useState } from "react";
import { getTravelHistory } from "@/lib/api";
import type { HistoryItem } from "@/types/api";

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getTravelHistory()
      .then((response) => setItems(response.data))
      .catch((error) =>
        setErrorMessage(error instanceof Error ? error.message : "获取失败"),
      );
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-6 py-10 text-zinc-950">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          History
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          历史攻略
        </h1>

        {errorMessage ? (
          <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-8 grid gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm text-teal-700">
                    {new Date(item.createdAt).toLocaleString("zh-CN")}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    {item.destination} · {item.duration} 天
                  </h2>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600">
                  #{item.id}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
