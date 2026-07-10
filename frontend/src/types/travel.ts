// 旅行攻略的完整结构，未来由 Agent 生成，前端按此结构渲染页面。
export interface TravelGuide {
  // 攻略唯一标识，用于保存、分享、导出和前端列表渲染。
  id: string;
  // 旅行目的地名称，例如“京都”。
  destination: string;
  // 目的地所在国家或地区，例如“日本”。
  country: string;
  // 行程总天数。
  duration: number;
  // 攻略摘要，用于页面开头、卡片预览或导出简介。
  summary: string;
  // 封面图片地址，未来可来自 AI 生成图片或外部图片资源。
  coverImage: string;
  // 攻略标签，用于表达主题、兴趣偏好或旅行风格。
  tags: string[];
  // 每日行程安排，用于渲染时间线和日程页面。
  itinerary: DayPlan[];
  // 景点详情列表，用于地图标记、详情弹窗和搜索结果关联。
  places: Place[];
  // 预算信息，用于展示费用估算和后续预算分析。
  budget: Budget;
  // 实用提示，例如交通、饮食、礼仪、安全和季节建议。
  tips: string[];
}

// 单日行程计划，描述某一天的主题、说明和关联景点。
export interface DayPlan {
  // 第几天，从 1 开始。
  day: number;
  // 当天行程标题。
  title: string;
  // 当天行程说明。
  description: string;
  // 当天涉及的景点 id 列表，对应 TravelGuide.places 中的 Place.id。
  places: string[];
}

// 景点或地点详情，未来可用于地图、攻略详情、搜索结果和网页导出。
export interface Place {
  // 地点唯一标识，用于行程引用、地图标记和详情跳转。
  id: string;
  // 地点名称。
  name: string;
  // 地点介绍。
  description: string;
  // 地点类别，例如 temple、shrine、food、shopping、nature、museum。
  category: string;
  // 地理位置，经纬度用于地图展示和路线规划。
  location: Location;
  // 建议停留时间，例如“1.5 小时”。
  recommendedDuration: string;
  // 推荐游览时间，例如“上午”或“傍晚”。
  bestTime: string;
  // 门票信息，例如价格、预约要求或免费说明。
  ticketInfo: string;
}

// 地理坐标信息，用于地图 Marker、路线规划和距离计算。
export interface Location {
  // 纬度。
  latitude: number;
  // 经度。
  longitude: number;
}

// 预算结构，未来可用于费用展示、预算计算和不同方案对比。
export interface Budget {
  // 交通费用估算。
  transportation: number;
  // 住宿费用估算。
  accommodation: number;
  // 餐饮费用估算。
  food: number;
  // 门票费用估算。
  ticket: number;
  // 其他费用估算，例如购物、保险或通信。
  other: number;
  // 总预算估算。
  total: number;
}
