from app.workflows.state import TravelState


def plan_travel_workflow(state: TravelState) -> TravelState:
    """分析用户需求，决定工具调用关键词。"""

    destination = state.request.destination.strip()

    print("Planner analyzing user request")

    if not destination:
        state.errors.append("目的地不能为空。")
        return state

    if destination == "京都":
        state.search_keywords = ["京都清水寺", "京都祇园", "京都伏见稻荷大社"]
    else:
        state.search_keywords = [
            f"{destination}必去景点",
            f"{destination}文化体验",
            f"{destination}美食",
        ]

    print(f"Planner generated search keywords: {state.search_keywords}")

    return state
