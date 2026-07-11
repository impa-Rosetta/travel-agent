import json
import urllib.error
import urllib.parse
import urllib.request


def search_places(keyword: str) -> dict[str, str]:
    """模拟搜索旅游地点信息。

    优先尝试公开 Wikipedia Summary API，失败时回退到 Mock 数据。
    这样工具接口已经具备真实搜索形态，同时本地开发不依赖外部网络。
    """

    normalized_keyword = keyword.strip()

    if not normalized_keyword:
        return _mock_search_result("未知地点")

    try:
        return _search_wikipedia(normalized_keyword)
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, KeyError):
        return _mock_search_result(normalized_keyword)


def _search_wikipedia(keyword: str) -> dict[str, str]:
    encoded_keyword = urllib.parse.quote(keyword)
    url = f"https://zh.wikipedia.org/api/rest_v1/page/summary/{encoded_keyword}"

    request = urllib.request.Request(
        url,
        headers={"User-Agent": "AITravelAgentLearningProject/1.0"},
    )

    with urllib.request.urlopen(request, timeout=5) as response:
        payload = json.loads(response.read().decode("utf-8"))

    title = payload.get("title") or keyword
    description = payload.get("extract") or f"{keyword} 的公开百科摘要。"

    return {
        "name": title,
        "description": description[:220],
        "category": "travel",
        "location": keyword[:2] or "未知地点",
    }


def _mock_search_result(keyword: str) -> dict[str, str]:
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
