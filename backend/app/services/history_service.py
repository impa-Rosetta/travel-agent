import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from app.schemas.guide import TravelGuide
from app.schemas.travel import TravelRequest


def save_history(request: TravelRequest, guide: TravelGuide) -> int:
    """保存一次生成记录。"""

    connection = _connect()
    _ensure_table(connection)

    cursor = connection.execute(
        """
        INSERT INTO travel_history (destination, request_json, guide_json, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            guide.destination,
            request.model_dump_json(ensure_ascii=False),
            guide.model_dump_json(ensure_ascii=False),
            datetime.now(timezone.utc).isoformat(),
        ),
    )
    connection.commit()
    history_id = int(cursor.lastrowid)
    connection.close()

    return history_id


def list_history() -> list[dict]:
    """列出历史记录摘要。"""

    connection = _connect()
    _ensure_table(connection)
    rows = connection.execute(
        """
        SELECT id, destination, request_json, guide_json, created_at
        FROM travel_history
        ORDER BY id DESC
        LIMIT 50
        """
    ).fetchall()
    connection.close()

    history = []

    for row in rows:
        guide = json.loads(row["guide_json"])
        history.append(
            {
                "id": row["id"],
                "destination": row["destination"],
                "duration": guide.get("duration"),
                "summary": guide.get("summary"),
                "createdAt": row["created_at"],
                "guide": guide,
                "request": json.loads(row["request_json"]),
            }
        )

    return history


def _connect() -> sqlite3.Connection:
    database_path = Path(os.getenv("TRAVEL_AGENT_DB", "data/travel_agent.db"))
    database_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(database_path)
    connection.row_factory = sqlite3.Row
    return connection


def _ensure_table(connection: sqlite3.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS travel_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            destination TEXT NOT NULL,
            request_json TEXT NOT NULL,
            guide_json TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )
    connection.commit()
