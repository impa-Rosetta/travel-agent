import type { TravelGuide } from "@/types/travel";

// FastAPI 后端返回给前端的统一响应结构。
export interface BackendResponse {
  status: string;
  message: string;
  data: TravelGuide;
}

export interface ExportResponse {
  status: string;
  data: {
    filename: string;
    contentType: string;
    content: string;
  };
}

export interface HistoryItem {
  id: number;
  destination: string;
  duration: number;
  summary: string;
  createdAt: string;
  guide: TravelGuide;
}

export interface HistoryResponse {
  status: string;
  data: HistoryItem[];
}
