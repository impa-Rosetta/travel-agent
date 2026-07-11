# 学习笔记

这个文件用于记录技术学习笔记，例如：

- Agent 概念
- Tool Calling
- LLM API
- React 知识
- 后端知识
- 地图开发知识

# 主题

Travel Agent 数据建模

## 问题

为什么 Agent 需要 Schema？

## 理解

大模型负责生成内容。

Schema 负责约束结构。

如果没有 Schema，Agent 可能每次都用不同格式输出内容。人可以理解这些变化，但程序很难稳定解析。对于旅游 Agent 来说，前端需要知道哪些字段是目的地、哪些字段是景点、哪些字段是经纬度、哪些字段是每日行程。

结构化数据让 Agent 输出可以被校验、传输、渲染和复用。

## 示例

`TravelGuide` 作为完整攻略结构，包含目的地、摘要、每日行程、景点列表、预算和提示。

其中 `DayPlan.places` 使用景点 id 引用 `Place.id`，这样每日行程和景点详情可以保持关联。

## 未来应用

- LLM Structured Output
- Tool Calling
- API 传输
- 前端渲染
- 地图 Marker 展示
- 静态网页导出

# 主题

React 组件化开发

## 问题

为什么需要组件？

## 理解

一个旅游攻略页面由多个独立模块组成。

组件负责：

接收数据

↓

渲染 UI

例如，`TravelHeader` 负责展示目的地基础信息，`DayTimeline` 负责展示每日行程，`PlaceCard` 负责展示单个景点，`BudgetCard` 负责展示预算，`TravelTips` 负责展示旅行建议。

组件化可以让页面更容易维护。修改预算展示时，只需要改 `BudgetCard`；修改景点样式时，只需要改 `PlaceCard`。

## 示例

`page.tsx` 从 `sample-guide.json` 读取数据，然后通过 props 传给组件：

```text
sample-guide.json
↓
page.tsx
↓
TravelHeader / DayTimeline / PlaceCard / BudgetCard / TravelTips
↓
Browser
```

## 未来应用

未来：

Agent 输出新的 TravelGuide

↓

页面自动更新

# 主题

Tailwind CSS 与组件设计

## 问题

为什么不用大量 CSS 文件？

## 理解

组件负责结构。

Tailwind 负责快速表达样式。

在这个项目里，`TravelHeader`、`DayTimeline`、`PlaceCard`、`BudgetCard` 和 `TravelTips` 都是独立组件。每个组件内部直接使用 Tailwind className 表达布局、间距、颜色、边框、阴影和响应式规则。

这样做可以减少样式文件和组件文件之间的来回跳转，也能让组件的结构和视觉意图放在同一个地方阅读。

## 示例

```text
React Component
↓
className 使用 Tailwind 工具类
↓
生成卡片、网格、间距、字体层级和响应式布局
```

例如：

- `max-w-7xl` 控制页面最大宽度
- `grid` 和 `xl:grid-cols-*` 控制响应式布局
- `rounded-*`、`border`、`shadow-*` 形成卡片层级
- `text-*` 和 `tracking-*` 控制文字层级

## 未来应用

未来：

Agent 生成内容

↓

组件自动展示

↓

Tailwind 保持一致的产品视觉风格

# 主题

Agent 应用中的用户输入设计

## 问题

为什么 Agent 需要结构化用户输入？

## 理解

用户自然语言需要转换为系统可以处理的数据。

旅游 Agent 需要知道目的地、旅行天数、人数、预算、兴趣偏好和旅行风格。用户可以用自由文本表达这些需求，但系统更适合处理稳定字段。

`TravelRequest` 就是用户需求的结构化表达。它让前端、后端和未来 Agent Planner 都能围绕同一份输入数据工作。

## 示例

```text
User Input
↓
TravelRequest
↓
Mock Agent
↓
TravelGuide
↓
Frontend
```

当前阶段用 Mock Agent 返回示例数据。未来会把 Mock Agent 替换为 Backend API 和真实 Agent Workflow。

## 未来应用

未来：

User Request

↓

Agent Planner

↓

TravelGuide Structured Output

# 主题

AI 应用中的 Backend 设计

## 问题

为什么 LLM 调用应该放 Backend？

## 理解

Frontend 负责交互。

Backend 负责智能能力。

LLM API Key、搜索 API Key 和其他外部工具密钥不能放在 Frontend，因为前端代码会被浏览器下载，密钥容易暴露。Backend 可以通过环境变量读取密钥，并在服务器端安全调用 LLM 和工具。

Backend 还负责校验用户请求、处理错误、组织 Agent Workflow，并把稳定的数据结构返回给 Frontend。

## 示例

```text
Frontend
↓
FastAPI Backend
↓
TravelRequest Schema
↓
Future Agent Workflow
```

当前 Day 6 只完成 FastAPI 基础服务和旅行需求接收接口。

## 未来应用

未来：

Agent Workflow 运行在 Backend。

Backend 接收 `TravelRequest`，调用 Agent，得到 `TravelGuide`，再返回给 Frontend 渲染。

## 问题

## 理解

## 示例

## 未来应用
