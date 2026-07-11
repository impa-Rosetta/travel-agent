from pydantic import BaseModel


class TravelRequest(BaseModel):
    """用户旅行需求结构，Backend 用它校验前端传入的数据。"""

    # 目的地，例如“京都”“东京”“巴黎”。
    destination: str
    # 旅行天数。
    duration: int
    # 出行人数。
    travelers: int
    # 总预算。
    budget: int
    # 兴趣偏好，例如文化探索、美食旅行、自然风光、购物。
    preferences: list[str]
    # 旅行风格，例如轻松慢游、经典打卡、深度体验。
    travelStyle: str
