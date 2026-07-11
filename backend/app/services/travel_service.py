from app.schemas.guide import TravelGuide
from app.schemas.travel import TravelRequest
from app.workflows.travel_workflow import TravelWorkflowError, run_travel_workflow


class TravelGuideGenerationError(Exception):
    """旅游攻略生成失败时抛出的业务异常。"""


def generate_travel_guide(request: TravelRequest) -> TravelGuide:
    """通过 Travel Workflow 生成结构化旅游攻略。

    API 路由不需要知道 Planner、Tool、Generator 和 Validator 细节。
    """

    try:
        return run_travel_workflow(request)
    except TravelWorkflowError as error:
        raise TravelGuideGenerationError(str(error)) from error
