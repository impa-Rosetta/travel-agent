from pydantic import BaseModel


class Location(BaseModel):
    """地点坐标，用于未来地图 Marker 和路线规划。"""

    # 纬度。
    latitude: float
    # 经度。
    longitude: float


class Place(BaseModel):
    """景点或地点详情，和前端 TravelGuide.places 保持一致。"""

    # 地点唯一标识，用于行程引用和地图标记。
    id: str
    # 地点名称。
    name: str
    # 地点介绍。
    description: str
    # 地点类别，例如 museum、food、landmark、nature。
    category: str
    # 地理坐标。
    location: Location
    # 建议停留时间。
    recommendedDuration: str
    # 推荐游览时间。
    bestTime: str
    # 门票信息。
    ticketInfo: str


class DayPlan(BaseModel):
    """单日行程安排。"""

    # 第几天，从 1 开始。
    day: int
    # 当天行程标题。
    title: str
    # 当天行程说明。
    description: str
    # 当天涉及的地点 id 列表。
    places: list[str]


class Budget(BaseModel):
    """预算结构，用于费用展示和后续方案比较。"""

    # 交通费用估算。
    transportation: int
    # 住宿费用估算。
    accommodation: int
    # 餐饮费用估算。
    food: int
    # 门票费用估算。
    ticket: int
    # 其他费用估算。
    other: int
    # 总预算估算。
    total: int


class TravelGuide(BaseModel):
    """完整旅游攻略结构，Backend 和 Frontend 之间的数据协议。"""

    # 攻略唯一标识。
    id: str
    # 目的地名称。
    destination: str
    # 目的地所在国家或地区。
    country: str
    # 行程总天数。
    duration: int
    # 攻略摘要。
    summary: str
    # 封面图片地址，未来可替换为 AI 生成图片。
    coverImage: str
    # 攻略标签。
    tags: list[str]
    # 每日行程。
    itinerary: list[DayPlan]
    # 地点详情。
    places: list[Place]
    # 预算信息。
    budget: Budget
    # 旅行建议。
    tips: list[str]
