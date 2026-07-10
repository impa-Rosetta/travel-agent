import sampleGuide from "@/data/sample-guide.json";
import type { TravelRequest } from "@/types/request";
import type { TravelGuide } from "@/types/travel";

// 这里模拟未来的 Agent 生成流程。
// 未来会替换为：Backend API + Agent Workflow。
export function generateGuide(request: TravelRequest): TravelGuide {
  console.log("Mock travel request:", request);

  return sampleGuide as TravelGuide;
}
