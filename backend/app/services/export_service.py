from app.schemas.guide import TravelGuide


def export_travel_guide(guide: TravelGuide, export_format: str) -> dict[str, str]:
    """导出 TravelGuide，支持 markdown、html、pdf 三种格式。

    当前 PDF 返回可打印 HTML，前端可用浏览器打印为 PDF。
    后续可以替换为真正的 PDF 渲染服务。
    """

    normalized_format = export_format.lower()

    if normalized_format == "markdown":
        return {
            "filename": f"{guide.destination}-travel-guide.md",
            "contentType": "text/markdown",
            "content": _to_markdown(guide),
        }

    if normalized_format == "html":
        return {
            "filename": f"{guide.destination}-travel-guide.html",
            "contentType": "text/html",
            "content": _to_html(guide),
        }

    if normalized_format == "pdf":
        return {
            "filename": f"{guide.destination}-travel-guide-print.html",
            "contentType": "text/html",
            "content": _to_html(guide, print_mode=True),
        }

    raise ValueError("仅支持 markdown、html、pdf。")


def _to_markdown(guide: TravelGuide) -> str:
    lines = [
        f"# {guide.destination}旅行攻略",
        "",
        guide.summary,
        "",
        "## 每日行程",
    ]

    place_by_id = {place.id: place for place in guide.places}

    for day in guide.itinerary:
        lines.extend([f"### Day {day.day} {day.title}", "", day.description, ""])
        for place_id in day.places:
            place = place_by_id.get(place_id)
            if place:
                lines.append(f"- {place.name}: {place.description}")
        lines.append("")

    lines.extend(["## 预算", "", f"- 总预算：{guide.budget.total}", "", "## 旅行建议"])
    lines.extend([f"- {tip}" for tip in guide.tips])

    return "\n".join(lines)


def _to_html(guide: TravelGuide, print_mode: bool = False) -> str:
    markdown = _to_markdown(guide)
    body = markdown.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    body = body.replace("\n", "<br />\n")
    print_script = "<script>window.print()</script>" if print_mode else ""

    return f"""<!doctype html>
<html lang=\"zh-CN\">
<head>
  <meta charset=\"utf-8\" />
  <title>{guide.destination}旅行攻略</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.7; padding: 40px; }}
  </style>
</head>
<body>
  <main>{body}</main>
  {print_script}
</body>
</html>"""
