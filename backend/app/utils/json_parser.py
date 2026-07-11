import json

from pydantic import ValidationError

from app.schemas.guide import TravelGuide


class TravelGuideParseError(Exception):
    """LLM 输出无法解析为 TravelGuide 时抛出的异常。"""


def parse_travel_guide_response(response_text: str) -> TravelGuide:
    """把 LLM 文本输出解析并校验为 TravelGuide。

    处理流程：
    LLM Response -> 提取 JSON -> json.loads -> Pydantic Validation。
    """

    try:
        json_text = _extract_json_text(response_text)
        data = json.loads(json_text)
        return _validate_travel_guide(data)
    except json.JSONDecodeError as error:
        raise TravelGuideParseError(
            f"LLM 返回的内容不是合法 JSON：{error.msg}"
        ) from error
    except ValidationError as error:
        raise TravelGuideParseError(
            f"LLM 返回的 JSON 不符合 TravelGuide Schema：{error}"
        ) from error
    except ValueError as error:
        raise TravelGuideParseError(str(error)) from error


def _extract_json_text(response_text: str) -> str:
    text = response_text.strip()

    if not text:
        raise ValueError("LLM 返回内容为空。")

    if text.startswith("```"):
        text = _remove_markdown_fence(text)

    if text.startswith("{") and text.endswith("}"):
        return text

    start_index = text.find("{")
    end_index = text.rfind("}")

    if start_index == -1 or end_index == -1 or end_index <= start_index:
        raise ValueError("LLM 返回内容中没有找到 JSON object。")

    return text[start_index : end_index + 1]


def _remove_markdown_fence(text: str) -> str:
    lines = text.splitlines()

    if lines and lines[0].strip().startswith("```"):
        lines = lines[1:]

    if lines and lines[-1].strip() == "```":
        lines = lines[:-1]

    return "\n".join(lines).strip()


def _validate_travel_guide(data: dict) -> TravelGuide:
    if not isinstance(data, dict):
        raise ValueError("LLM 返回的 JSON 顶层必须是 object。")

    return TravelGuide.model_validate(data)
