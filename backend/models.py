from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class SessionCreate(BaseModel):
    template_url: str
    reference_urls: List[str] = []

class SessionResponse(BaseModel):
    session_id: str
    status: str
    message: str

class AgentStatus(BaseModel):
    id: str
    name: str
    status: str  # 'pending', 'running', 'completed', 'failed'
    details: Optional[str] = None

class CritiqueLogEntry(BaseModel):
    id: int
    type: str  # 'blocker', 'retry', 'info'
    text: str
    source: str

class SessionState(BaseModel):
    session_id: str
    overall_status: str
    agents: List[AgentStatus]
    critique_logs: List[CritiqueLogEntry]
    current_prd_draft: str
