from openai import OpenAIError

from app.llm.client import create_llm_client, get_llm_model
from app.prompts.travel_prompt import SYSTEM_PROMPT
from app.schemas.guide import TravelGuide
from app.schemas.travel import TravelRequest
from app.tools.search_tool import search_places
from app.utils.json_parser import TravelGuideParseError, parse_travel_guide_response


class TravelAgentError(Exception):
    """Travel Agent 执行失败时抛出的异常。"""


class TravelAgent:
    """手写的简化 Travel Agent。

    当前 Agent 只做一件事：根据用户需求决定调用模拟 Search Tool，
    再把工具观察结果交给 LLM 生成 TravelGuide。
    """

    def generate(self, request: TravelRequest) -> TravelGuide:
        print("Travel Agent started")

        try:
            observations = self._run_tools(request)
            user_prompt = self._build_user_prompt(request, observations)
            return self._call_llm(user_prompt)
        except RuntimeError as error:
            raise TravelAgentError(str(error)) from error
        except OpenAIError as error:
            raise TravelAgentError(f"LLM 请求失败：{error}") from error
        except TravelGuideParseError as error:
            raise TravelAgentError(str(error)) from error

    def _run_tools(self, request: TravelRequest) -> list[dict[str, str]]:
        if not self._should_search(request):
            print("Agent decided not to call search tool")
            return []

        print("Agent decided to call search tool")

        search_keywords = self._build_search_keywords(request)
        observations = [search_places(keyword) for keyword in search_keywords]

        print(f"Search tool returned information: {observations}")

        return observations

    def _should_search(self, request: TravelRequest) -> bool:
        return bool(request.destination.strip())

    def _build_search_keywords(self, request: TravelRequest) -> list[str]:
        destination = request.destination.strip()

        if destination == "京都":
            return ["京都清水寺", "京都祇园", "京都伏见稻荷大社"]

        return [
            f"{destination}必去景点",
            f"{destination}文化体验",
            f"{destination}美食",
        ]

    def _build_user_prompt(
        self, request: TravelRequest, observations: list[dict[str, str]]
    ) -> str:
        preferences = "、".join(request.preferences) or "通用旅行体验"
        observation_text = self._format_observations(observations)

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

    def _format_observations(self, observations: list[dict[str, str]]) -> str:
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

    def _call_llm(self, user_prompt: str) -> TravelGuide:
        client = create_llm_client()
        model = get_llm_model()

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
            raise TravelAgentError("LLM 返回内容为空。")

        return parse_travel_guide_response(content)
