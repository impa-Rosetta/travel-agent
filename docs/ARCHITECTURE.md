# AI Travel Agent 架构说明

## 当前产品流程

```text
User Request
↓
Frontend Form
↓
FastAPI Backend
↓
Travel Workflow
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
↓
Interactive Web Page
```

## Backend

- API 层负责接收请求和返回响应。
- Service 层负责提供稳定业务入口。
- Workflow 层负责编排 Planner、Tool、Generator 和 Validator。
- Tool 层负责外部能力，例如搜索、图片、地图、导出。
- Schema 层负责定义稳定数据协议。

## Frontend

- 表单负责收集用户旅行需求。
- 攻略页面负责展示 TravelGuide。
- 地图组件负责展示景点 Marker。
- 下载组件负责导出 Markdown、HTML 和可打印 PDF 页面。
- 历史页面负责展示已生成攻略记录。
