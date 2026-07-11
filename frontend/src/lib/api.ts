import type { BackendResponse, ExportResponse, HistoryResponse } from "@/types/api";
import type { TravelRequest } from "@/types/request";
import type { TravelGuide } from "@/types/travel";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

// 统一封装旅行需求 API，避免把后端地址散落在组件中。
export async function travelRequest(
  request: TravelRequest,
): Promise<BackendResponse> {
  const response = await fetch(`${API_BASE_URL}/api/travel/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("后端接口请求失败，请确认 Backend 服务已经启动。");
  }

  return response.json() as Promise<BackendResponse>;
}

export async function exportTravelGuide(
  guide: TravelGuide,
  format: "markdown" | "html" | "pdf",
): Promise<ExportResponse> {
  const response = await fetch(`${API_BASE_URL}/api/travel/export/${format}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guide),
  });

  if (!response.ok) {
    throw new Error("导出失败，请稍后再试。");
  }

  return response.json() as Promise<ExportResponse>;
}

export async function getTravelHistory(): Promise<HistoryResponse> {
  const response = await fetch(`${API_BASE_URL}/api/travel/history`);

  if (!response.ok) {
    throw new Error("历史记录获取失败，请确认 Backend 服务已经启动。");
  }

  return response.json() as Promise<HistoryResponse>;
}
