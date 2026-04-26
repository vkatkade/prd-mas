import asyncio
import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse

from models import SessionCreate, SessionResponse, SessionState
from database import redis_db, firestore_db

app = FastAPI(title="The Infrastructure Architect - Backend API")

# Configure CORS for the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_initial_state(session_id: str) -> dict:
    return {
        "session_id": session_id,
        "overall_status": "initializing",
        "agents": [
            {"id": "structure", "name": "Structure Agent", "status": "pending", "desc": "Maps intent to schema"},
            {"id": "librarian", "name": "Librarian Agent", "status": "pending", "desc": "RAG & NotebookLM"},
            {"id": "competitive", "name": "Competitive Agent", "status": "pending", "desc": "Benchmarking"},
            {"id": "critical", "name": "Critical Analyst", "status": "pending", "desc": "Zero-Trust Red-Team"},
            {"id": "style", "name": "Style Agent", "status": "pending", "desc": "Voice Matching"},
        ],
        "critique_logs": [],
        "current_prd_draft": "# Initializing Session...\nWaiting for agent pipeline to start."
    }

@app.post("/sessions", response_model=SessionResponse)
async def create_session(session_req: SessionCreate):
    session_id = str(uuid.uuid4())
    
    # 1. Initialize State in Redis
    initial_state = create_initial_state(session_id)
    redis_db.set_session_state(session_id, initial_state)
    
    # 2. Mock: In a real flow, we would enqueue a Cloud Task here to start Layer 3 (ADK Agent Runtime)
    # enqueue_agent_task(session_id, session_req.template_url)
    
    return SessionResponse(
        session_id=session_id,
        status="created",
        message="Session initialized. Agent pipeline queued."
    )

@app.get("/sessions/{session_id}/status")
async def get_session_status(session_id: str):
    state = redis_db.get_session_state(session_id)
    if not state:
        raise HTTPException(status_code=404, detail="Session not found")
    return state

@app.get("/sessions/{session_id}/stream")
async def stream_session_state(session_id: str):
    """
    Server-Sent Events (SSE) endpoint to push state updates to the frontend.
    Polls Redis for changes (in production, use Pub/Sub or Redis Keyspace Notifications).
    """
    async def event_generator():
        last_state_str = None
        
        # We will loop until the overall_status is 'completed' or 'failed'
        # For demonstration, we just poll Redis every second
        while True:
            # If client disconnects, asyncio.CancelledError is raised
            state = redis_db.get_session_state(session_id)
            if not state:
                yield {"event": "error", "data": "Session not found"}
                break
                
            current_state_str = str(state)
            if current_state_str != last_state_str:
                yield {
                    "event": "update",
                    "data": current_state_str  # In reality, serialize to JSON
                }
                last_state_str = current_state_str
                
            if state.get("overall_status") in ["completed", "failed"]:
                break
                
            await asyncio.sleep(1)
            
    return EventSourceResponse(event_generator())

@app.get("/sessions/{session_id}/prd")
async def get_finalized_prd(session_id: str):
    # Fetch from Firestore
    if firestore_db:
        doc_ref = firestore_db.collection("prds").document(session_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
    
    # Fallback to Redis state if Firestore isn't connected
    state = redis_db.get_session_state(session_id)
    if state and "current_prd_draft" in state:
        return {"prd_content": state["current_prd_draft"]}
        
    raise HTTPException(status_code=404, detail="PRD not found")

@app.post("/sessions/{session_id}/export")
async def trigger_export(session_id: str):
    # Triggers Publisher Agent
    return {"status": "export_queued"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
