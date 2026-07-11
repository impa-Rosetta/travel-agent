from app.schemas.guide import Budget, DayPlan, Location, Place, TravelGuide
from app.schemas.travel import TravelRequest


def generate_travel_guide(request: TravelRequest) -> TravelGuide:
    """根据用户需求生成旅游攻略。

    当前是 Mock Agent：只根据 TravelRequest 拼装结构化 TravelGuide。
    未来这里会替换为 Backend API + LLM Agent Workflow。
    """

    destination = request.destination.strip() or "未知目的地"
    places = _build_mock_places(destination)
    itinerary = _build_itinerary(destination, request.duration, places)
    budget = _build_budget(request.budget)
    tags = _build_tags(request.preferences, request.travelStyle)

    return TravelGuide(
        id=f"mock-{destination.lower()}-{request.duration}d",
        destination=destination,
        country=_guess_country(destination),
        duration=request.duration,
        summary=(
            f"这是一份为 {request.travelers} 人设计的 {destination} "
            f"{request.duration} 天游攻略，偏好包含{_format_preferences(request.preferences)}，"
            f"旅行节奏为{request.travelStyle}。当前内容由 Backend Mock Agent 生成，"
            "未来会替换为真实 LLM Agent 输出。"
        ),
        coverImage="",
        tags=tags,
        itinerary=itinerary,
        places=places,
        budget=budget,
        tips=[
            "提前确认景点开放时间，热门场馆建议预约。",
            "把每天行程控制在 2-3 个核心地点，避免过度赶路。",
            "保留一段弹性时间，用于临时发现的餐厅、街区或休息。",
            "未来接入搜索工具后，这些建议会根据实时信息更新。",
        ],
    )


def _build_mock_places(destination: str) -> list[Place]:
    if destination in {"西安", "西安市"}:
        return [
            Place(
                id="bell-tower",
                name="钟楼",
                description="西安城市中心地标，适合作为初到西安的路线起点。",
                category="landmark",
                location=Location(latitude=34.2610, longitude=108.9426),
                recommendedDuration="1 小时",
                bestTime="傍晚",
                ticketInfo="登楼需购票，外观参观免费。",
            ),
            Place(
                id="muslim-quarter",
                name="回民街",
                description="聚集多种本地小吃，适合体验西安烟火气和夜间美食。",
                category="food",
                location=Location(latitude=34.2656, longitude=108.9438),
                recommendedDuration="2 小时",
                bestTime="晚上",
                ticketInfo="街区免费，餐饮按实际消费。",
            ),
            Place(
                id="city-wall",
                name="西安城墙",
                description="保存完整的古城墙，可步行或骑行感受城市格局。",
                category="history",
                location=Location(latitude=34.2539, longitude=108.9431),
                recommendedDuration="2 小时",
                bestTime="下午",
                ticketInfo="需购票，骑行另计费用。",
            ),
            Place(
                id="shaanxi-history-museum",
                name="陕西历史博物馆",
                description="系统了解周秦汉唐历史的核心场馆，适合文化探索。",
                category="museum",
                location=Location(latitude=34.2307, longitude=108.9543),
                recommendedDuration="3 小时",
                bestTime="上午",
                ticketInfo="通常需提前预约。",
            ),
            Place(
                id="giant-wild-goose-pagoda",
                name="大雁塔",
                description="唐代文化地标，周边适合串联广场和夜景。",
                category="culture",
                location=Location(latitude=34.2180, longitude=108.9594),
                recommendedDuration="1.5 小时",
                bestTime="傍晚",
                ticketInfo="广场免费，登塔需购票。",
            ),
            Place(
                id="great-tang-mall",
                name="大唐不夜城",
                description="夜间氛围强的步行街区，适合作为一天行程收尾。",
                category="shopping",
                location=Location(latitude=34.2143, longitude=108.9675),
                recommendedDuration="2 小时",
                bestTime="晚上",
                ticketInfo="街区免费。",
            ),
        ]

    return [
        Place(
            id="city-landmark",
            name=f"{destination}城市地标",
            description=f"适合快速建立对 {destination} 的第一印象。",
            category="landmark",
            location=Location(latitude=35.0116, longitude=135.7681),
            recommendedDuration="1.5 小时",
            bestTime="上午",
            ticketInfo="以现场信息为准。",
        ),
        Place(
            id="history-area",
            name=f"{destination}历史街区",
            description="适合慢行、拍照和了解目的地文化脉络。",
            category="culture",
            location=Location(latitude=35.0037, longitude=135.7786),
            recommendedDuration="2 小时",
            bestTime="下午",
            ticketInfo="街区免费。",
        ),
        Place(
            id="local-market",
            name=f"{destination}本地市场",
            description="适合体验当地小吃、伴手礼和日常生活氛围。",
            category="food",
            location=Location(latitude=35.0050, longitude=135.7647),
            recommendedDuration="1.5 小时",
            bestTime="中午",
            ticketInfo="免费进入，餐饮按实际消费。",
        ),
        Place(
            id="museum",
            name=f"{destination}博物馆",
            description="适合系统理解目的地历史、艺术和城市故事。",
            category="museum",
            location=Location(latitude=35.0122, longitude=135.7668),
            recommendedDuration="2 小时",
            bestTime="上午",
            ticketInfo="可能需要预约或购票。",
        ),
        Place(
            id="view-point",
            name=f"{destination}观景点",
            description="适合在行程后半段放慢节奏，欣赏城市景观。",
            category="nature",
            location=Location(latitude=35.0262, longitude=135.7982),
            recommendedDuration="1 小时",
            bestTime="傍晚",
            ticketInfo="以现场信息为准。",
        ),
    ]


def _build_itinerary(
    destination: str, duration: int, places: list[Place]
) -> list[DayPlan]:
    day_titles = ["经典初见", "文化深度", "轻松收尾", "城市延展", "自由探索"]
    itinerary: list[DayPlan] = []

    for day in range(1, duration + 1):
        start_index = ((day - 1) * 2) % len(places)
        day_places = [
            places[start_index].id,
            places[(start_index + 1) % len(places)].id,
        ]

        itinerary.append(
            DayPlan(
                day=day,
                title=f"{destination}{day_titles[(day - 1) % len(day_titles)]}路线",
                description=(
                    f"第 {day} 天围绕 {places[start_index].name} 和 "
                    f"{places[(start_index + 1) % len(places)].name} 展开，"
                    "保持适中的游览节奏。"
                ),
                places=day_places,
            )
        )

    return itinerary


def _build_budget(total_budget: int) -> Budget:
    total = max(total_budget, 0)

    transportation = round(total * 0.18)
    accommodation = round(total * 0.38)
    food = round(total * 0.22)
    ticket = round(total * 0.12)
    other = total - transportation - accommodation - food - ticket

    return Budget(
        transportation=transportation,
        accommodation=accommodation,
        food=food,
        ticket=ticket,
        other=other,
        total=total,
    )


def _build_tags(preferences: list[str], travel_style: str) -> list[str]:
    tags = [preference for preference in preferences if preference]

    if travel_style:
        tags.append(travel_style)

    return tags or ["旅行攻略"]


def _guess_country(destination: str) -> str:
    country_map = {
        "京都": "日本",
        "东京": "日本",
        "大阪": "日本",
        "西安": "中国",
        "西安市": "中国",
        "北京": "中国",
        "上海": "中国",
        "成都": "中国",
    }

    return country_map.get(destination, "待确认国家/地区")


def _format_preferences(preferences: list[str]) -> str:
    if not preferences:
        return "通用旅行体验"

    return "、".join(preferences)
