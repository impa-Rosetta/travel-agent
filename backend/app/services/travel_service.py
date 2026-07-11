import json

from openai import OpenAIError
from pydantic import ValidationError

from app.llm.client import create_llm_client, get_llm_model
from app.prompts.travel_prompt import SYSTEM_PROMPT
from app.schemas.guide import TravelGuide
from app.schemas.travel import TravelRequest


class TravelGuideGenerationError(Exception):
    """旅游攻略生成失败时抛出的业务异常。"""


def generate_travel_guide(request: TravelRequest) -> TravelGuide:
    """调用 LLM 生成结构化旅游攻略。

    API 路由不需要知道具体模型细节，只调用这个稳定的 Service 函数。
    """

    try:
        client = create_llm_client()
        model = get_llm_model()
        user_prompt = _build_user_prompt(request)

        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.3,
            response_format={"type": "json_object"},
        )

        content = response.choices[0].message.content

        if not content:
            raise TravelGuideGenerationError("LLM 返回内容为空。")

        data = json.loads(content)
        return _validate_travel_guide(data)
    except RuntimeError as error:
        raise TravelGuideGenerationError(str(error)) from error
    except OpenAIError as error:
        raise TravelGuideGenerationError(f"LLM 请求失败：{error}") from error
    except json.JSONDecodeError as error:
        raise TravelGuideGenerationError("LLM 返回的内容不是合法 JSON。") from error
    except ValidationError as error:
        raise TravelGuideGenerationError(
            f"LLM 返回的 JSON 不符合 TravelGuide Schema：{error}"
        ) from error


def _build_user_prompt(request: TravelRequest) -> str:
    preferences = "、".join(request.preferences) or "通用旅行体验"

    return f"""
请根据以下用户旅行需求生成 TravelGuide JSON：

- 目的地：{request.destination}
- 旅行天数：{request.duration}
- 出行人数：{request.travelers}
- 总预算：{request.budget}
- 兴趣偏好：{preferences}
- 旅行风格：{request.travelStyle}

请确保输出可以被后端直接解析为 JSON，并符合系统消息中的 TravelGuide Schema。
"""


def _validate_travel_guide(data: dict) -> TravelGuide:
    if hasattr(TravelGuide, "model_validate"):
        return TravelGuide.model_validate(data)

    return TravelGuide.parse_obj(data)
