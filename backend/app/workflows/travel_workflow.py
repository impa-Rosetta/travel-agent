from app.schemas.guide import TravelGuide
from app.schemas.travel import TravelRequest
from app.tools.search_tool import search_places
from app.workflows.generator import TravelGuideGeneratorError, generate_raw_travel_guide
from app.workflows.planner import plan_travel_workflow
from app.workflows.state import TravelState
from app.workflows.validator import TravelGuideValidatorError, validate_travel_guide


class TravelWorkflowError(Exception):
    """Travel Workflow 执行失败。"""


def run_travel_workflow(request: TravelRequest) -> TravelGuide:
    """串联 Planner -> Tools -> Generator -> Validator。"""

    print("Travel Workflow started")

    state = TravelState(request=request)
    state = plan_travel_workflow(state)

    if state.errors:
        raise TravelWorkflowError("；".join(state.errors))

    state = _run_tools(state)

    try:
        state = generate_raw_travel_guide(state)
        state = validate_travel_guide(state)
    except (TravelGuideGeneratorError, TravelGuideValidatorError) as error:
        raise TravelWorkflowError(str(error)) from error

    if not state.guide:
        raise TravelWorkflowError("Workflow 未生成 TravelGuide。")

    print("Travel Workflow finished")

    return state.guide


def _run_tools(state: TravelState) -> TravelState:
    print("Tool Layer started")

    for keyword in state.search_keywords:
        print(f"Search Tool called with keyword: {keyword}")
        state.observations.append(search_places(keyword))

    print(f"Tool Layer observations: {state.observations}")

    return state
