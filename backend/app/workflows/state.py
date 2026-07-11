from pydantic import BaseModel, Field

from app.schemas.guide import TravelGuide
from app.schemas.travel import TravelRequest


class TravelState(BaseModel):
    """Travel Workflow 在各步骤之间传递的状态。"""

    request: TravelRequest
    search_keywords: list[str] = Field(default_factory=list)
    observations: list[dict[str, str]] = Field(default_factory=list)
    raw_llm_output: str | None = None
    guide: TravelGuide | None = None
    errors: list[str] = Field(default_factory=list)
