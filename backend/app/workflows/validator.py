from app.tools.image_tool import generate_destination_cover, generate_place_images
from app.utils.json_parser import TravelGuideParseError, parse_travel_guide_response
from app.workflows.state import TravelState


class TravelGuideValidatorError(Exception):
    """TravelGuide 校验失败。"""


def validate_travel_guide(state: TravelState) -> TravelState:
    """把 LLM 原始输出解析并校验为 TravelGuide。"""

    print("Validator checking TravelGuide schema")

    if not state.raw_llm_output:
        raise TravelGuideValidatorError("缺少 LLM 原始输出，无法校验。")

    try:
        guide = parse_travel_guide_response(state.raw_llm_output)
    except TravelGuideParseError as error:
        raise TravelGuideValidatorError(str(error)) from error

    if not guide.coverImage:
        guide.coverImage = generate_destination_cover(guide.destination)

    if not guide.placeImages:
        guide.placeImages = generate_place_images(
            [place.id for place in guide.places],
            guide.destination,
        )

    state.guide = guide
    print("Validator accepted TravelGuide")

    return state
