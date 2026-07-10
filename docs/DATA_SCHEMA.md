# TravelGuide 数据结构说明

## 1. 为什么需要统一数据结构

AI Travel Agent 的目标不是只生成一段文字攻略，而是生成可以被系统继续使用的数据。

统一数据结构可以让 LLM、Backend 和 Frontend 使用同一套格式协作：

- LLM 按固定结构生成旅游攻略。
- Backend 校验字段是否完整、类型是否正确。
- Frontend 根据字段稳定渲染页面、地图、预算和导出内容。

如果没有统一结构，前端会很难判断哪些内容是景点、哪些内容是每日行程、哪些内容可以放到地图上。

## 2. TravelGuide 整体结构

`TravelGuide` 是一份完整旅游攻略的数据模型。

它包含：

- 基础信息：`id`、`destination`、`country`、`duration`
- 展示信息：`summary`、`coverImage`、`tags`
- 行程安排：`itinerary`
- 景点详情：`places`
- 预算信息：`budget`
- 实用提示：`tips`

整体数据关系：

```text
TravelGuide
├── itinerary: DayPlan[]
│   └── places: string[]
├── places: Place[]
│   └── location: latitude / longitude
├── budget: Budget
└── tips: string[]
```

`DayPlan.places` 保存的是景点 id。前端可以根据 id 到 `TravelGuide.places` 中找到完整景点详情。

## 3. 字段说明

### TravelGuide

- `id`：攻略唯一标识，用于保存、分享和导出。
- `destination`：旅行目的地名称。
- `country`：目的地所在国家或地区。
- `duration`：旅行天数。
- `summary`：攻略摘要。
- `coverImage`：封面图片地址，未来可接入 AI 图片生成。
- `tags`：攻略标签，例如文化、美食、亲子、慢旅行。
- `itinerary`：每日行程列表。
- `places`：景点详情列表。
- `budget`：预算信息。
- `tips`：实用提示。

### DayPlan

- `day`：第几天。
- `title`：当天行程标题。
- `description`：当天行程说明。
- `places`：当天关联的景点 id 列表。

### Place

- `id`：地点唯一标识。
- `name`：地点名称。
- `description`：地点介绍。
- `category`：地点类别，例如寺院、神社、美食、自然、地标。
- `location.latitude`：纬度，用于地图展示。
- `location.longitude`：经度，用于地图展示。
- `recommendedDuration`：建议停留时间。
- `bestTime`：推荐游览时间。
- `ticketInfo`：门票信息。

### Budget

- `transportation`：交通预算。
- `accommodation`：住宿预算。
- `food`：餐饮预算。
- `ticket`：门票预算。
- `other`：其他预算。
- `total`：总预算。

## 4. 示例数据流程

未来数据流程：

```text
用户输入旅行需求
↓
LLM 生成 TravelGuide JSON
↓
Backend 校验 JSON 是否符合 Schema
↓
Frontend 读取 TravelGuide 数据
↓
渲染攻略页面、地图标记、预算和导出内容
```

当前阶段使用 `frontend/src/data/sample-guide.json` 作为 Mock 数据。

未来接入 Agent 后，这份 Mock 数据会被真实 LLM Structured Output 替代。
