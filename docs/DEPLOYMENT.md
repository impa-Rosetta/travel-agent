# Deployment Guide

## Frontend

推荐部署到 Vercel。

环境变量：

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com
```

构建命令：

```bash
cd frontend
npm install
npm run build
```

## Backend

可部署到 Render、Fly.io、Railway 或支持 Python 的云服务。

环境变量：

```env
LLM_API_KEY=
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-chat
TRAVEL_AGENT_DB=data/travel_agent.db
```

启动命令：

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 注意事项

- 不要提交 `.env`。
- 生产环境需要把 CORS 域名改成真实前端域名。
- SQLite 适合学习和原型，正式产品可替换为 PostgreSQL。
