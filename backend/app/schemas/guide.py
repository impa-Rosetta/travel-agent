from pydantic import BaseModel, ConfigDict, Field, NonNegativeInt, PositiveInt, model_validator


class Location(BaseModel):
    """地点坐标，用于未来地图 Marker 和路线规划。"""

    model_config = ConfigDict(extra="forbid")

    # 纬度。
    latitude: float = Field(ge=-90, le=90)
    # 经度。
    longitude: float = Field(ge=-180, le=180)


class Place(BaseModel):
    """景点或地点详情，和前端 TravelGuide.places 保持一致。"""

    model_config = ConfigDict(extra="forbid")

    # 地点唯一标识，用于行程引用和地图标记。
    id: str = Field(min_length=1)
    # 地点名称。
    name: str = Field(min_length=1)
    # 地点介绍。
    description: str = Field(min_length=1)
    # 地点类别，例如 museum、food、landmark、nature。
    category: str = Field(min_length=1)
    # 地理坐标。
    location: Location
    # 建议停留时间。
    recommendedDuration: str = Field(min_length=1)
    # 推荐游览时间。
    bestTime: str = Field(min_length=1)
    # 门票信息。
    ticketInfo: str = Field(min_length=1)


class DayPlan(BaseModel):
    """单日行程安排。"""

    model_config = ConfigDict(extra="forbid")

    # 第几天，从 1 开始。
    day: PositiveInt
    # 当天行程标题。
    title: str = Field(min_length=1)
    # 当天行程说明。
    description: str = Field(min_length=1)
    # 当天涉及的地点 id 列表。
    places: list[str] = Field(min_length=1)


class Budget(BaseModel):
    """预算结构，用于费用展示和后续方案比较。"""

    model_config = ConfigDict(extra="forbid")

    # 交通费用估算。
    transportation: NonNegativeInt
    # 住宿费用估算。
    accommodation: NonNegativeInt
    # 餐饮费用估算。
    food: NonNegativeInt
    # 门票费用估算。
    ticket: NonNegativeInt
    # 其他费用估算。
    other: NonNegativeInt
    # 总预算估算。
    total: NonNegativeInt


class TravelGuide(BaseModel):
    """完整旅游攻略结构，Backend 和 Frontend 之间的数据协议。"""

    model_config = ConfigDict(extra="forbid")

    # 攻略唯一标识。
    id: str = Field(min_length=1)
    # 目的地名称。
    destination: str = Field(min_length=1)
    # 目的地所在国家或地区。
    country: str = Field(min_length=1)
    # 行程总天数。
    duration: PositiveInt
    # 攻略摘要。
    summary: str = Field(min_length=1)
    # 封面图片地址，未来可替换为 AI 生成图片。
    coverImage: str
    # 地点图片地址映射，key 为 place.id，value 为图片 URL 或 Mock 图片地址。
    placeImages: dict[str, str] = Field(default_factory=dict)
    # 攻略标签。
    tags: list[str] = Field(min_length=1)
    # 每日行程。
    itinerary: list[DayPlan] = Field(min_length=1)
    # 地点详情。
    places: list[Place] = Field(min_length=1)
    # 预算信息。
    budget: Budget
    # 旅行建议。
    tips: list[str] = Field(min_length=1)

    @model_validator(mode="after")
    def validate_place_references(self):
        place_ids = {place.id for place in self.places}
        unknown_ids = [
            place_id
            for day_plan in self.itinerary
            for place_id in day_plan.places
            if place_id not in place_ids
        ]

        if unknown_ids:
            raise ValueError(
                f"itinerary.places 引用了不存在的地点 id：{', '.join(unknown_ids)}"
            )

        if len(self.itinerary) != self.duration:
            raise ValueError("itinerary 天数必须和 duration 一致。")

        return self
