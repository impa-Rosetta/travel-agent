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

# 主题

Frontend 与 Backend 通信

## 问题

为什么不用 Frontend 直接运行 Agent？

## 理解

Backend 负责：

- AI 逻辑
- API Key
- 工具调用
- 请求校验
- Agent Workflow

Frontend 负责：

- 用户输入
- 交互状态
- 页面展示

如果 Frontend 直接运行 Agent，就会把密钥、工具调用和复杂逻辑暴露在浏览器里。通过 Backend API，可以让浏览器只发送结构化请求，并接收稳定 JSON 响应。

## 示例

```text
用户提交表单
↓
React Component
↓
fetch()
↓
FastAPI /api/travel/request
↓
JSON Response
↓
React State 更新页面
```

## 未来应用

未来 `travelRequest()` 不只是接收确认信息，而是会触发 Backend 中的 Mock Agent Service，再逐步替换为真实 Agent Workflow。

# 主题

Backend 中的 Agent 设计

## 问题

为什么不直接在 API 调用 LLM？

## 理解

API 负责通信。

Service 负责业务。

Agent 负责智能。

如果 API 路由里直接调用 LLM，接口会同时承担请求接收、参数校验、业务流程、模型调用、错误处理和结果格式化，后续会很难维护。

Service Layer 可以作为稳定边界：API 把结构化请求交给 Service，Service 再决定当前使用 Mock Generator，还是未来使用真实 Agent Workflow。

## 示例

```text
API
↓
Service
↓
Mock Generator
↓
TravelGuide
```

未来：

```text
API
↓
Agent Workflow
↓
LLM
↓
Tools
↓
TravelGuide
```

## 未来应用

Service Layer 会扩展：

- Planner Agent
- Search Agent
- Map Agent
- Image Agent

# 主题

LLM Agent 基础

## 问题

LLM 为什么不能直接输出普通文本？

## 理解

AI 应用需要：

```text
输入约束
↓
模型生成
↓
结构化解析
↓
业务使用
```

普通文本适合人阅读，但不适合程序稳定处理。旅游攻略页面需要明确知道目的地、天数、景点、坐标、预算和建议分别在哪里。

Structured Output 让 LLM 输出 JSON，Backend 再用 Pydantic 校验为 `TravelGuide`。这样 Frontend 可以继续用同一套组件展示结果，不需要解析自然语言文章。

## 示例

```text
TravelRequest
↓
Prompt Template
↓
LLM JSON
↓
TravelGuide
↓
React Components
```

## 未来应用

未来 LLM Agent 会继续扩展：

- 使用更严格的 JSON Schema
- 增加重试和自动修复 JSON
- 接入搜索工具补充实时信息
- 接入地图和图片生成能力

# 主题

LLM 输出可靠性

## 问题

为什么 Agent 不能直接相信 LLM 输出？

## 理解

LLM 负责生成。

Schema 负责约束。

Parser 负责转换。

Business Layer 负责使用。

模型输出具有不确定性，即使 Prompt 要求返回 JSON，也可能出现格式漂移、字段缺失、类型错误或多余文本。Agent 系统需要把模型输出当作外部输入处理，而不是直接信任。

可靠流程应该是：

```text
LLM Response
↓
JSON Parser
↓
Pydantic Validation
↓
TravelGuide
↓
Frontend
```

## 示例

如果模型返回：

```text
Markdown code fence + JSON:
{ "destination": "京都", "duration": 3 }
```

Parser 负责提取 JSON，Pydantic 负责发现字段缺失，Business Layer 再返回明确错误。

## 未来应用

未来可以继续增强：

- 自动修复不完整 JSON
- 对失败输出进行一次重试
- 用 JSON Schema 直接约束模型输出
- 为不同 Agent 定义不同的数据协议

# 主题

Agent 和 Tool 设计

## 问题

LLM 为什么需要工具？

## 理解

LLM 负责推理。

Tool 负责获取外部能力。

普通 LLM 调用只能依赖模型已有知识和 Prompt。Agent 加入 Tool 后，可以先根据任务做决策，再调用搜索、地图、图片、文件导出等工具，把工具返回的 Observation 交给 LLM 生成更可靠的结果。

今天的 Search Tool 是模拟版本，重点不是搜索真实数据，而是理解工具层的位置：

```text
用户
↓
Agent
↓
Decision
↓
Tool
↓
Observation
↓
LLM
↓
Answer
```

## 示例

用户请求京都文化旅行时，TravelAgent 会调用 Search Tool 查询：

- 京都清水寺
- 京都祇园
- 京都伏见稻荷大社

Search Tool 返回模拟地点信息后，LLM 在生成 TravelGuide 时可以参考这些观察结果。

## 未来应用

未来可以扩展：

- Search Agent
- Map Agent
- Image Agent
- Export Agent

# 主题

Agent Workflow 架构

## 问题

为什么要把 Agent 拆成 Workflow？

## 理解

单个 Agent 类如果同时负责规划、调用工具、生成和校验，会很快变得难维护。Workflow 把过程拆成 Planner、Tools、Generator、Validator，每一步职责更清晰。

## 示例

```text
Request
↓
Planner
↓
Tools
↓
Generator
↓
Validator
↓
TravelGuide
```

## 未来应用

Day13-Day20 的搜索、地图、图片、导出和历史记录都可以围绕 Workflow 扩展。

# 主题

Search Tool 与 fallback

## 问题

为什么真实搜索工具还要保留 Mock fallback？

## 理解

外部 API 可能失败、超时、限流或网络不可用。Agent 工具应该设计为可替换接口，并在失败时提供降级结果，保证产品原型仍能运行。

## 示例

```text
search_places()
↓
Public API
↓
失败时 Mock fallback
```

## 未来应用

未来可以接入 Tavily、SerpAPI、Google Places 或自建搜索服务。

# 主题

地图交互

## 问题

地图能力为什么要和 TravelGuide 数据结构连接？

## 理解

地图 Marker 依赖 `Place.location` 的经纬度。只要 Agent 输出稳定地点数据，Frontend 就可以自动把地点渲染成地图 Marker，并和景点卡片联动。

## 示例

```text
Place.location
↓
Marker
↓
Click
↓
Place Detail
```

## 未来应用

未来可以把 Mock Map Mode 替换为 Leaflet 或 Mapbox。

# 主题

Image Agent 接口

## 问题

为什么图片能力也要做成工具接口？

## 理解

图片生成服务可能来自不同供应商。通过 `image_tool.py` 包装，业务层只关心 `coverImage` 和 `placeImages`，不用关心底层图片服务。

## 示例

```text
TravelGuide
↓
Image Tool
↓
coverImage / placeImages
```

## 未来应用

未来可以接入真实 AI 图片生成 API。

# 主题

导出与历史记录

## 问题

为什么 AI 产品需要下载和历史记录？

## 理解

生成结果如果只能临时查看，产品价值有限。下载让用户带走攻略，历史记录让用户回到过去生成的内容。

## 示例

```text
TravelGuide
↓
Export Service
↓
Markdown / HTML / PDF
```

```text
TravelRequest + TravelGuide
↓
SQLite
↓
History Page
```

## 未来应用

未来可以增加登录、云端同步和多设备历史记录。

# 主题

部署与项目作品化

## 问题

为什么 GitHub 项目需要部署文档和 README 打磨？

## 理解

一个作品项目不只是代码能运行，还要让别人理解它解决什么问题、如何运行、架构如何设计、未来如何扩展。

## 示例

```text
README
↓
Architecture
↓
Deployment
↓
Demo
```

## 未来应用

后续可以把项目部署到 Vercel + Render，形成可访问的在线 Demo。

## 问题

## 理解

## 示例

## 未来应用
