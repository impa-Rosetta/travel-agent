from urllib.parse import quote


def generate_destination_cover(destination: str) -> str:
    """生成目的地封面图地址。

    当前使用可替换的 Mock 图片服务 URL，不调用真实图片生成 API。
    未来可以替换为 DALL-E、GPT Image、Stable Diffusion 或其他图片服务。
    """

    keyword = quote(destination or "travel")
    return f"https://source.unsplash.com/1600x900/?{keyword},travel"


def generate_place_images(place_ids: list[str], destination: str) -> dict[str, str]:
    """为地点生成图片地址映射。"""

    keyword = quote(destination or "travel")

    return {
        place_id: f"https://source.unsplash.com/900x600/?{keyword},{quote(place_id)}"
        for place_id in place_ids
    }
