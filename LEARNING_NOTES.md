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

## 问题

## 理解

## 示例

## 未来应用
