# Backend

AI Travel Agent 的 Backend 使用 FastAPI 搭建。

当前阶段只提供基础 API 服务，不接入 LLM，不调用外部 API，也不实现真正 Agent。

## 目录结构

```text
backend/
├── app/
│   ├── main.py
│   ├── api/
│   ├── schemas/
│   └── services/
├── requirements.txt
└── README.md
```

说明：

- `app/main.py`：FastAPI 应用入口，负责创建应用并注册路由。
- `app/api/`：API 路由目录，负责定义 HTTP 接口。
- `app/schemas/`：数据结构目录，负责定义请求和响应的数据格式。
- `app/services/`：业务服务目录，未来用于放置 Agent 调用、工具调用和业务逻辑。
- `.env.example`：环境变量示例文件，未来用于说明需要哪些密钥。

## 本地运行

安装依赖：

```bash
pip install -r requirements.txt
```

启动服务：

```bash
uvicorn app.main:app --reload
```

访问：

```text
http://127.0.0.1:8000
```

## 当前接口

```text
GET /
POST /api/travel/request
```

当前接口只用于验证 Backend 基础架构。未来会替换为真实 Agent Workflow。
