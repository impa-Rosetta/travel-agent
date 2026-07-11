from openai import OpenAIError

from app.llm.client import create_llm_client, get_llm_model
from app.prompts.travel_prompt import SYSTEM_PROMPT
from app.workflows.state import TravelState


class TravelGuideGeneratorError(Exception):
    """LLM 生成阶段失败。"""


def generate_raw_travel_guide(state: TravelState) -> TravelState:
    """调用 LLM 生成 TravelGuide 原始 JSON 文本。"""

    print("Generator preparing LLM prompt")

    try:
        client = create_llm_client()
        model = get_llm_model()

        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": _build_user_prompt(state)},
            ],
            temperature=0.3,
            response_format={"type": "json_object"},
        )
    except OpenAIError as error:
        raise TravelGuideGeneratorError(f"LLM 请求失败：{error}") from error

    content = response.choices[0].message.content

    if not content:
        raise TravelGuideGeneratorError("LLM 返回内容为空。")

    state.raw_llm_output = content
    print("Generator received LLM output")

    return state


def _build_user_prompt(state: TravelState) -> str:
    request = state.request
    preferences = "、".join(request.preferences) or "通用旅行体验"
    observation_text = _format_observations(state.observations)

    return f"""
请根据以下用户旅行需求生成 TravelGuide JSON：

- 目的地：{request.destination}
- 旅行天数：{request.duration}
- 出行人数：{request.travelers}
- 总预算：{request.budget}
- 兴趣偏好：{preferences}
- 旅行风格：{request.travelStyle}

工具观察结果：
{observation_text}

请优先参考工具观察结果，但最终输出仍必须符合系统消息中的 TravelGuide Schema。
"""


def _format_observations(observations: list[dict[str, str]]) -> str:
    if not observations:
        return "无工具观察结果。"

    lines = []

    for index, observation in enumerate(observations, start=1):
        lines.append(
            (
                f"{index}. name={observation['name']}; "
                f"category={observation['category']}; "
                f"location={observation['location']}; "
                f"description={observation['description']}"
            )
        )

    return "\n".join(lines)
