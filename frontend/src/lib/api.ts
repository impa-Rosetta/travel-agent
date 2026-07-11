import type { BackendResponse } from "@/types/api";
import type { TravelRequest } from "@/types/request";

const API_BASE_URL = "http://127.0.0.1:8000";

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
