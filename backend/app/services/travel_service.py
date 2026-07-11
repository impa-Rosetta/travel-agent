from app.agents.travel_agent import TravelAgent, TravelAgentError
from app.schemas.guide import TravelGuide
from app.schemas.travel import TravelRequest


class TravelGuideGenerationError(Exception):
    """旅游攻略生成失败时抛出的业务异常。"""


def generate_travel_guide(request: TravelRequest) -> TravelGuide:
    """通过 Travel Agent 生成结构化旅游攻略。

    API 路由不需要知道 Agent、Tool 和 LLM 细节，只调用这个稳定函数。
    """

    try:
        agent = TravelAgent()
        return agent.generate(request)
    except TravelAgentError as error:
        raise TravelGuideGenerationError(str(error)) from error
