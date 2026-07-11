from fastapi import FastAPI

from app.api.travel import router as travel_router

# 创建 FastAPI 应用实例，作为后端服务入口。
app = FastAPI(title="AI Travel Agent Backend")


@app.get("/")
def read_root():
    # 健康检查接口，用于确认后端服务已经启动。
    return {"message": "AI Travel Agent Backend Running"}


# 注册旅游需求相关 API 路由。
app.include_router(travel_router)
