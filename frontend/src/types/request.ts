// 用户旅行需求结构，未来会传给 Backend 和 Agent Planner。
export interface TravelRequest {
  // 目的地，例如“京都”“东京”“巴黎”。
  destination: string;
  // 旅行天数。
  duration: number;
  // 出行人数。
  travelers: number;
  // 总预算，当前用用户输入的数字表示。
  budget: number;
  // 兴趣偏好，例如文化探索、美食旅行、自然风光、购物。
  preferences: string[];
  // 旅行风格，例如轻松慢游、经典打卡、深度体验。
  travelStyle: string;
}
