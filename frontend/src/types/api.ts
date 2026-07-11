import type { TravelGuide } from "@/types/travel";

// FastAPI 后端返回给前端的统一响应结构。
export interface BackendResponse {
  status: string;
  message: string;
  data: TravelGuide;
}
