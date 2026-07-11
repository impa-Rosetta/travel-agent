# Demo 说明

## 用户流程

1. 用户输入目的地、天数、人数、预算、兴趣偏好和旅行风格。
2. Backend 进入 Travel Workflow。
3. Planner 分析需求。
4. Tool Layer 获取景点信息。
5. Generator 调用 LLM 生成 TravelGuide JSON。
6. Validator 校验 Schema。
7. Frontend 展示交互式攻略页面。
8. 用户可以查看地图、点击景点、下载攻略和查看历史记录。

## 当前能力

- LLM 生成结构化旅游攻略
- Search Tool 搜索能力，带 Mock fallback
- 地图 Marker 交互
- 目的地封面和地点图片接口
- Markdown / HTML / PDF 下载
- SQLite 历史记录

## 未来方向

- 接入真实地图 SDK
- 接入真实图片生成 API
- 增加用户登录
- 增加多城市路线规划
