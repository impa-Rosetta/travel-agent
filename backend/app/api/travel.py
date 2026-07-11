from fastapi import APIRouter

from app.schemas.travel import TravelRequest

router = APIRouter(prefix="/api/travel", tags=["travel"])


@router.post("/request")
def receive_travel_request(request: TravelRequest):
    # 当前只模拟接收旅行需求，不调用 LLM，也不执行 Agent Workflow。
    return {
        "status": "success",
        "message": "Travel request received",
        "data": request,
    }
