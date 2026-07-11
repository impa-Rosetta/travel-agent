import os

from dotenv import load_dotenv
from openai import OpenAI


def create_llm_client() -> OpenAI:
    """创建 OpenAI 兼容客户端。

    DeepSeek 等模型服务兼容 OpenAI API，所以这里统一使用 OpenAI SDK。
    真实 API Key 只从 .env 读取，不能写入代码或提交到 Git。
    """

    load_dotenv()

    api_key = os.getenv("LLM_API_KEY")
    base_url = os.getenv("LLM_BASE_URL")

    if not api_key:
        raise RuntimeError("缺少 LLM_API_KEY，请在 backend/.env 中配置。")

    if not base_url:
        raise RuntimeError("缺少 LLM_BASE_URL，请在 backend/.env 中配置。")

    return OpenAI(api_key=api_key, base_url=base_url)


def get_llm_model() -> str:
    """读取当前使用的模型名称。"""

    load_dotenv()

    model = os.getenv("LLM_MODEL")

    if not model:
        raise RuntimeError("缺少 LLM_MODEL，请在 backend/.env 中配置。")

    return model
