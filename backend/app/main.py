from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.travel import router as travel_router

# 创建 FastAPI 应用实例，作为后端服务入口。
app = FastAPI(title="AI Travel Agent Backend")

# 允许本地 Next.js 前端访问 FastAPI。
# 未来部署时需要改成正式前端域名。
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    # 健康检查接口，用于确认后端服务已经启动。
    return {"message": "AI Travel Agent Backend Running"}


# 注册旅游需求相关 API 路由。
app.include_router(travel_router)
