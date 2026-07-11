def search_places(keyword: str) -> dict[str, str]:
    """模拟搜索旅游地点信息。

    当前不调用真实搜索 API，只返回静态示例数据。
    未来这里会替换为真实搜索服务或外部 API。
    """

    normalized_keyword = keyword.strip()

    mock_places = {
        "京都清水寺": {
            "name": "清水寺",
            "description": "京都著名历史寺庙，以木造舞台和东山景色闻名。",
            "category": "culture",
            "location": "京都",
        },
        "京都祇园": {
            "name": "祇园",
            "description": "京都传统街区，保留町屋、花见小路和艺伎文化氛围。",
            "category": "culture",
            "location": "京都",
        },
        "京都伏见稻荷大社": {
            "name": "伏见稻荷大社",
            "description": "以千本鸟居闻名的神社，是京都代表性景点之一。",
            "category": "culture",
            "location": "京都",
        },
    }

    return mock_places.get(
        normalized_keyword,
        {
            "name": normalized_keyword,
            "description": f"{normalized_keyword} 的模拟搜索结果，未来会替换为真实搜索 API。",
            "category": "travel",
            "location": normalized_keyword[:2] or "未知地点",
        },
    )
