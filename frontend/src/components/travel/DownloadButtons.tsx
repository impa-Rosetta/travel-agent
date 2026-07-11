"use client";

import { useState } from "react";
import { exportTravelGuide } from "@/lib/api";
import type { TravelGuide } from "@/types/travel";

interface DownloadButtonsProps {
  guide: TravelGuide;
}

export function DownloadButtons({ guide }: DownloadButtonsProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  async function handleExport(format: "markdown" | "html" | "pdf") {
    setIsExporting(format);

    try {
      const response = await exportTravelGuide(guide, format);
      const { filename, contentType, content } = response.data;
      const blob = new Blob([content], { type: contentType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(null);
    }
  }

  return (
    <section className="rounded-[2rem] border border-zinc-200/80 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
        Export
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
        下载攻略
      </h2>
      <div className="mt-5 grid gap-3">
        {(["markdown", "html", "pdf"] as const).map((format) => (
          <button
            key={format}
            type="button"
            onClick={() => handleExport(format)}
            className="rounded-full bg-zinc-950 px-4 py-3 text-sm font-semibold uppercase text-white transition hover:bg-zinc-800 disabled:bg-zinc-400"
            disabled={isExporting !== null}
          >
            {isExporting === format ? "导出中..." : `下载 ${format}`}
          </button>
        ))}
      </div>
    </section>
  );
}
