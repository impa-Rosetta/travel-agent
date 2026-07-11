# 开发日志

## Day 1

## 日期：

2026-07-10

## 今日目标：

初始化前端工程。

## 完成内容：

- 创建 Next.js 前端项目
- 配置 TypeScript
- 配置 Tailwind CSS
- 完成实机运行测试并记录页面截图

## 新增文件：

- frontend/

## 学习知识：

- Next.js
- React
- TypeScript
- 前后端分离

## 技术理解：

前端应该独立于 Agent 后端，因为它们承担的职责不同。

前端负责用户界面、交互体验和结果展示。用户输入旅行需求、查看旅游攻略、浏览每日行程、点击地图地标，这些都属于前端关注的问题。

Agent 后端负责需求理解、任务规划、工具调用、信息整理和结构化输出。它更关注数据如何被生成、处理和返回。

把前端和 Agent 后端分开，可以让前端先使用模拟数据开发页面，也可以让后端独立演进 Agent 工作流。未来二者通过 API 连接，数据从后端流向前端，前端负责把数据清晰地展示给用户。

## 实机测试结果：

本地运行前端开发服务器后，浏览器可以正常打开初始化页面。

测试页面显示当前阶段为 `Stage 1 - Frontend Initialization`，说明 Next.js 前端工程已经可以正常启动并渲染基础页面。

![Day 1 前端初始化实机测试截图](./docs/images/day-1-frontend-test.png)

## 遇到问题：

- 首次运行 Next.js 初始化命令时，沙盒环境无法访问 npm registry。
- 首次运行 `npm run build` 时，Next.js 16 的 Turbopack 在沙盒内创建进程和绑定端口被系统拦截。
- npm 安装完成后提示依赖审计中存在 2 个中等级别问题，本次未使用可能破坏依赖版本的自动修复命令。

## 解决方案：

- 使用授权方式重新运行官方初始化命令，完成前端工程创建。
- 使用授权方式重新运行 `npm run build`，生产构建通过。
- 暂不运行 `npm audit fix --force`，后续可以单独安排依赖安全维护任务。

## Git Commit:

feat: initialize frontend application

## 明日计划：

创建旅游攻略数据模型。

## Day 2

## 日期：

2026-07-10

## 今日目标：

设计旅游攻略数据模型。

## 完成内容：

- 创建 TypeScript Interface
- 创建 Sample JSON
- 创建数据结构文档

## 新增文件：

- frontend/src/types/travel.ts
- frontend/src/data/sample-guide.json
- docs/DATA_SCHEMA.md

## 学习知识：

- Schema
- Interface
- Structured Output
- 数据驱动开发

## 技术理解：

Agent 应该输出结构化数据，而不是只输出一段自由文本。

自由文本适合人阅读，但不适合程序稳定处理。旅游攻略未来需要被前端拆分成页面标题、每日行程、景点卡片、地图坐标、预算信息和导出内容。如果 Agent 只输出 Markdown，前端很难稳定判断每一段文字的真实含义。

结构化数据可以让 Agent 的输出进入后续工程流程：Backend 可以校验 JSON 是否符合 Schema，Frontend 可以按字段渲染页面，地图可以读取经纬度生成 Marker，导出功能也可以复用同一份数据。

## 遇到问题：

无

## 解决方案：

无

## Git Commit:

feat: define travel guide data schema

## 下一阶段：

实现基于 Mock 数据的旅游攻略页面。

## Day 3

## 日期：

2026-07-10

## 今日目标：

实现旅游攻略展示页面。

## 完成内容：

- 创建 React 组件
- 使用 JSON 数据驱动页面
- 完成旅游攻略原型
- 使用本地开发服务器验证页面渲染

## 新增文件：

- frontend/src/components/travel/TravelHeader.tsx
- frontend/src/components/travel/DayTimeline.tsx
- frontend/src/components/travel/PlaceCard.tsx
- frontend/src/components/travel/BudgetCard.tsx
- frontend/src/components/travel/TravelTips.tsx

## 修改文件：

- frontend/src/app/page.tsx
- DEVELOPMENT_LOG.md
- LEARNING_NOTES.md

## 学习知识：

- React Component
- Props
- 数据驱动 UI
- 组件拆分

## 技术理解：

未来 Agent 只需要生成符合 `TravelGuide` 结构的 JSON，前端就可以自动展示页面。

原因是页面组件并不关心数据来自哪里，只关心收到的数据结构是否稳定。`page.tsx` 读取 `sample-guide.json` 后，把目的地信息传给 `TravelHeader`，把每日行程传给 `DayTimeline`，把景点传给 `PlaceCard`，把预算传给 `BudgetCard`，把建议传给 `TravelTips`。

当未来接入 Agent 后，只要 Agent 输出同样结构的 `TravelGuide JSON`，前端组件就可以复用，不需要为每个目的地重新写页面。

## 测试结果：

- `npm run lint` 通过。
- `npm run dev` 启动后，`localhost:3000` 可以展示京都标题、三天行程、景点卡片、预算估算和旅行建议。
- `npm run build` 在授权环境下通过，生产构建成功。

实机测试截图：

![Day 3 旅游攻略原型页面截图](./docs/images/day-3-travel-guide-prototype.png)

## 遇到问题：

- 首次在沙盒内运行 `npm run dev` 时，Next.js 无法绑定 `0.0.0.0:3000`，出现 `listen EPERM`。
- 首次在沙盒内运行 `npm run build` 时，Next.js 16 的 Turbopack 创建进程和绑定端口被拦截。

## 解决方案：

- 使用授权方式重新运行 `npm run dev`，开发服务器成功启动，并完成本地页面验证。
- 使用授权方式重新运行 `npm run build`，生产构建通过。

## Git Commit:

feat: build travel guide prototype page

## 下一阶段：

完善页面交互。

## Day 4

## 日期：

2026-07-10

## 今日目标：

优化旅游攻略页面 UI。

## 完成内容：

- 优化页面布局
- 完善组件样式
- 增加响应式设计
- 生成 Day 4 UI 预览图

## 新增文件：

- docs/images/day-4-ui-preview.png

## 修改文件：

- frontend/src/app/page.tsx
- frontend/src/components/travel/TravelHeader.tsx
- frontend/src/components/travel/DayTimeline.tsx
- frontend/src/components/travel/PlaceCard.tsx
- frontend/src/components/travel/BudgetCard.tsx
- frontend/src/components/travel/TravelTips.tsx
- DEVELOPMENT_LOG.md
- LEARNING_NOTES.md

## 学习知识：

- Tailwind CSS
- Responsive Design
- UI 组件设计

## 技术理解：

好的 Agent 产品不仅需要生成正确内容，还需要优秀的展示层。

Agent 负责生成结构化数据，但用户真正接触到的是页面。旅游攻略包含目的地、行程、景点、预算和建议，如果展示层没有清晰的信息层级，用户会难以快速理解攻略价值。

本次优化通过 Hero 区域突出目的地，通过行程卡片强化阅读顺序，通过预算和建议侧栏提供辅助决策信息。这样未来 Agent 生成新的 `TravelGuide JSON` 后，前端可以用同一套组件把内容组织成更容易阅读的产品页面。

## 测试结果：

- `npm run lint` 通过。
- `npm run dev` 启动后，页面可以正常打开并展示 Day 4 优化后的 UI。
- `npm run build` 在授权环境下通过，生产构建成功。
- 示例数据检查通过：包含 3 天行程、9 个景点、预算和经纬度信息。

UI 预览图：

![Day 4 UI 预览图](./docs/images/day-4-ui-preview.png)

## 遇到问题：

- 沙盒内无法直接绑定端口运行 `npm run dev`，需要授权运行本地开发服务器。
- 沙盒内运行 `npm run build` 时，Next.js 16 的 Turbopack 创建进程和绑定端口被拦截。
- Playwright 和系统截图工具在当前环境中无法完成真实浏览器截图。

## 解决方案：

- 使用授权方式运行 `npm run dev` 验证页面。
- 使用授权方式运行 `npm run build` 验证生产构建。
- 使用当前 TravelGuide 数据生成 `docs/images/day-4-ui-preview.png`，作为 Day 4 UI 预览记录。

## Git Commit:

feat: improve travel guide user interface

## 下一阶段：

加入地图可视化。

## Day 5

## 日期：

2026-07-10

## 今日目标：

实现旅行需求输入原型。

## 完成内容：

- 创建 TravelRequest 数据模型
- 创建输入表单
- 模拟 Agent 生成流程
- 使用 React State 管理用户输入和页面状态

## 新增文件：

- frontend/src/types/request.ts
- frontend/src/components/travel/TravelRequestForm.tsx
- frontend/src/mock/generate-guide.ts

## 修改文件：

- frontend/src/app/page.tsx
- DEVELOPMENT_LOG.md
- LEARNING_NOTES.md

## 学习知识：

- React State
- 用户输入管理
- 前后端交互思想

## 技术理解：

今天的 Mock Agent 是未来真实 Agent 的替代接口。

当前 `generateGuide` 函数接收 `TravelRequest`，返回本地 `sample-guide.json`，模拟“用户提交需求后生成攻略”的过程。它不调用后端、不调用大模型，也不实现真实 Agent。

这样做的意义是提前确定前端交互边界：页面只需要把用户输入整理成结构化 `TravelRequest`，再等待一个返回 `TravelGuide` 的生成函数。未来接入后端时，可以把本地 `generateGuide` 替换为 Backend API + Agent Workflow，而页面主流程不需要大改。

React 状态流：

```text
Input
↓
State
↓
Function
↓
Component Update
```

## 测试结果：

- `npm run lint` 通过。
- `npm run build` 在授权环境下通过，生产构建成功。
- `npm run dev` 启动后，页面可以展示旅行需求输入表单和等待生成状态。

## 遇到问题：

- 沙盒内运行 `npm run build` 时，Next.js 16 的 Turbopack 创建进程和绑定端口被拦截。
- 沙盒内直接运行 `npm run dev` 需要授权绑定本地端口。

## 解决方案：

- 使用授权方式运行 `npm run build` 验证生产构建。
- 使用授权方式运行 `npm run dev` 验证 Day 5 输入页面。

## Git Commit:

feat: add travel request input prototype

## 下一阶段：

开始准备 Backend 和 LLM 接口。

## Day 6

## 日期：

2026-07-11

## 目标：

初始化 Backend。

## 完成：

- 创建 FastAPI 项目
- 创建 API 接口
- 创建 Pydantic Schema
- 创建环境变量示例文件
- 完成本地接口测试

## 新增文件：

- backend/requirements.txt
- backend/.env.example
- backend/README.md
- backend/app/main.py
- backend/app/api/travel.py
- backend/app/schemas/travel.py
- backend/app/services/.gitkeep

## 学习：

- Backend
- FastAPI
- REST API
- Pydantic

## 技术理解：

Agent 应用需要 Backend，因为智能能力、密钥管理、请求校验、工具调用和工作流编排都不应该直接放在 Frontend。

Frontend 负责交互和展示。Backend 负责接收请求、校验数据、保护 API Key，并在未来调用 Agent Workflow。今天的 Backend 只接收旅行需求并返回确认信息，还没有接入 LLM，也没有实现真正 Agent。

当前架构：

```text
Frontend
↓
Backend
↓
Mock Service
```

未来架构：

```text
Frontend
↓
Backend
↓
Agent
↓
LLM
↓
Tools
```

## 测试结果：

- `python3 -m py_compile app/main.py app/api/travel.py app/schemas/travel.py` 通过。
- `GET /` 返回 `AI Travel Agent Backend Running`。
- `POST /api/travel/request` 可以接收旅行需求并返回成功响应。

## 遇到的问题：

- 沙盒内直接运行 `uvicorn app.main:app --reload` 时，本地端口监听被拦截。

## 解决方案：

- 使用授权方式运行 `uvicorn app.main:app --reload`，完成接口验证后停止服务。

## Git Commit:

feat: initialize backend api service

## 下一阶段：

Frontend 连接 Backend。

## Day 7

## 日期：

2026-07-11

## 目标：

完成前后端通信。

## 完成内容：

- 创建 API 封装
- 前端调用 FastAPI
- 替换 Mock 调用
- 增加 loading 状态和错误处理
- 为本地前后端通信配置 CORS

## 新增文件：

- frontend/src/lib/api.ts
- frontend/src/types/api.ts

## 修改文件：

- frontend/src/app/page.tsx
- frontend/src/components/travel/TravelRequestForm.tsx
- backend/app/main.py
- backend/app/schemas/travel.py
- DEVELOPMENT_LOG.md
- LEARNING_NOTES.md

## 学习：

- REST API
- HTTP Request
- Frontend Backend Communication

## 技术理解：

AI 应用通常采用前后端分离，因为 Frontend 和 Backend 的职责不同。

Frontend 负责用户输入、交互状态和结果展示。Backend 负责接收请求、校验数据、保护 API Key，并在未来调用 Agent Workflow。这样可以避免把 LLM Key、工具调用和复杂工作流暴露在浏览器中。

Day 7 的数据流：

```text
用户
↓
React Component
↓
fetch()
↓
FastAPI Endpoint
↓
JSON Response
↓
React State
```

## 测试结果：

- `npm run lint` 通过。
- `npm run build` 在授权环境下通过，生产构建成功。
- `POST /api/travel/request` 返回成功响应。
- CORS 预检请求通过，允许 `http://localhost:3000` 调用后端。
- 前端页面可以加载 Day 7 表单和 Backend 通信说明。

## 遇到问题：

- 浏览器从 `localhost:3000` 请求 `127.0.0.1:8000` 需要 CORS 配置。
- 沙盒内运行本地前后端服务和构建时仍会遇到端口或 Turbopack 权限限制。

## 解决方案：

- 在 FastAPI 中添加 `CORSMiddleware`，允许本地 Next.js 前端访问。
- 使用授权方式运行 `uvicorn`、`npm run dev` 和 `npm run build` 完成验证。

## Git Commit:

feat: connect frontend with backend api

## 下一阶段：

Backend 接入 Mock Agent Service。

## Day 8

## 日期：

2026-07-11

## 目标：

Backend Agent Service 设计。

## 完成：

- 创建 Service Layer
- 迁移 Mock Agent
- Backend 生成 TravelGuide
- Frontend 改为展示 Backend 返回的 TravelGuide

## 新增文件：

- backend/app/schemas/guide.py
- backend/app/services/travel_service.py

## 修改文件：

- backend/app/api/travel.py
- frontend/src/app/page.tsx
- frontend/src/types/api.ts
- DEVELOPMENT_LOG.md
- LEARNING_NOTES.md

## 学习：

- Service Layer
- Backend 业务逻辑
- Agent 架构
- 前后端数据协议

## 技术理解：

API 负责通信，Service 负责业务流程，未来 Agent 负责智能生成。

如果把所有逻辑都写在 API 接口里，接口会越来越难维护，也不方便测试和替换。Service Layer 把“接收请求”和“生成攻略”拆开，让后续从 Mock Agent 切换到 LLM Agent Workflow 时，不需要大幅修改前端和 API 路由。

Day 8 的数据流：

```text
Frontend
↓
FastAPI API
↓
Travel Service
↓
Mock Agent
↓
TravelGuide
```

## 测试结果：

- `python3 -m py_compile app/main.py app/api/travel.py app/schemas/travel.py app/schemas/guide.py app/services/travel_service.py` 通过。
- `POST /api/travel/request` 可以返回完整 TravelGuide。
- 输入 `西安` 时，Backend 返回西安版行程、景点、预算和建议。
- `npm run lint` 通过。
- `npm run build` 在授权环境下通过，生产构建成功。

## 遇到问题：

- 沙盒内直接运行 `npm run build` 时，Turbopack 创建进程和绑定端口被拦截。

## 解决方案：

- 使用授权环境运行 `npm run build` 完成生产构建验证。

## Git Commit:

feat: add backend travel service layer

## 下一阶段：

准备真实 LLM 接入前的接口边界和错误处理。

## Day 9

## 日期：

2026-07-11

## 目标：

接入 LLM。

## 完成：

- 创建 LLM Client
- 创建 Prompt 模板
- Backend 调用模型生成 TravelGuide
- 增加 API Key 缺失、LLM 请求失败、JSON 解析失败和 Schema 校验失败的异常处理
- 创建后端虚拟环境并安装 LLM 相关依赖

## 新增文件：

- backend/.gitignore
- backend/app/llm/client.py
- backend/app/prompts/travel_prompt.py

## 修改文件：

- backend/.env.example
- backend/requirements.txt
- backend/app/api/travel.py
- backend/app/services/travel_service.py
- DEVELOPMENT_LOG.md
- LEARNING_NOTES.md

## 学习：

- API Key 管理
- Prompt Engineering
- Structured Output
- OpenAI Compatible API
- Pydantic 校验

## 技术理解：

Mock Agent 升级为 LLM Agent 后，Service Layer 不再手写固定攻略，而是把用户需求转换为 Prompt，调用 OpenAI 兼容 API，让模型返回 TravelGuide JSON。

Backend 负责读取 `.env` 中的密钥和模型配置，调用 LLM，并用 Pydantic 把模型输出校验为稳定的数据结构。Frontend 仍然只接收 TravelGuide，不需要关心内容来自 Mock 还是真实模型。

Day 9 的数据流：

```text
用户需求
↓
Prompt Template
↓
LLM
↓
JSON Response
↓
Pydantic Model
↓
Frontend
```

## 测试结果：

- `backend/.venv` 虚拟环境创建成功。
- `openai` 和 `python-dotenv` 安装成功。
- `.venv/bin/python -m py_compile app/main.py app/api/travel.py app/schemas/travel.py app/schemas/guide.py app/llm/client.py app/prompts/travel_prompt.py app/services/travel_service.py` 通过。
- `.venv/bin/python -c 'import openai, dotenv; print(openai.__version__)'` 通过，OpenAI SDK 版本为 `2.45.0`。
- 未配置 `.env` 时，`POST /api/travel/request` 返回友好错误：缺少 `LLM_API_KEY`。
- 配置 DeepSeek API Key 后，`POST /api/travel/request` 成功返回 LLM 生成的 TravelGuide JSON。
- 前端页面可以展示 LLM 返回的旅游攻略内容。

后端 LLM API 测试截图：

![Day 9 LLM API Test](docs/images/day-9-llm-api-test.png)

前端 LLM 结果展示截图：

![Day 9 LLM Frontend Preview](docs/images/day-9-llm-frontend-preview.png)

## 遇到问题：

- 系统 Python 是 externally managed environment，不能直接全局安装 pip 依赖。
- 沙盒内安装依赖时无法访问 Python 包源。
- 授权联网后，本机 Python 证书链校验失败。
- 初次测试时 `LLM_BASE_URL` 少了 `https://`，导致请求配置不完整。

## 解决方案：

- 创建 `backend/.venv` 项目虚拟环境。
- 使用授权网络安装依赖。
- 通过 pip `--trusted-host` 完成依赖安装。
- 保留 `.env.example`，真实 `.env` 由本地开发者自己创建，不提交 Git。
- 将 `LLM_BASE_URL` 修正为 `https://api.deepseek.com` 后，真实 LLM 调用成功。

## Git Commit:

feat: integrate llm travel agent

## 下一阶段：

完善 LLM 输出稳定性和错误提示。

## 日期：

## 今日目标：

## 完成内容：

## 新增文件：

## 涉及技术：

## 技术理解：

## 遇到的问题：

## 解决方案：

## Git Commit:

## 明日计划：
