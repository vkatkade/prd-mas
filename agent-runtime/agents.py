from pydantic import BaseModel
import asyncio
from typing import Optional

# Mocking the ADK Context and Agent classes as defined in the PRD
class Context:
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.artifacts = {}
    
    async def save_artifact(self, name: str, data: any):
        self.artifacts[name] = data
        
    async def get_artifact(self, name: str):
        return self.artifacts.get(name)

class CritiqueResult(BaseModel):
    has_blockers: bool
    details: str

class LlmAgent:
    def __init__(self, name: str, role: str, system_prompt: str, tools: list = None):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt
        self.tools = tools or []
        
    async def run(self, ctx: Context, input_data: str = None) -> any:
        print(f"[{self.name}] Running...")
        await asyncio.sleep(2) # Simulate LLM generation time
        
        # Specific logic for the Critical Analyst to simulate finding a blocker on the first run
        if self.name == "CriticalAnalyst":
            # Just a simple mock toggle: block the first time, pass the second
            if not getattr(self, '_has_run_once', False):
                self._has_run_once = True
                print(f"[{self.name}] Blocker found!")
                return CritiqueResult(has_blockers=True, details="Section 2.2 lacks explicit JWT revocation path. ZTA principle violation.")
            else:
                print(f"[{self.name}] Validation passed.")
                return CritiqueResult(has_blockers=False, details="All ZTA requirements met.")
                
        return f"Draft output from {self.name}"

    async def retry(self, ctx: Context, feedback: str) -> str:
        print(f"[{self.name}] Retrying with feedback: {feedback}")
        await asyncio.sleep(2)
        return f"Revised draft output from {self.name} based on feedback."

# Define the SME Squad Agents based on the PRD
structure_agent = LlmAgent(
    name="StructureAgent",
    role="Schema Enforcer",
    system_prompt="Maps user intent to the template schema. Extracts metadata from GWS Docs/Slides. Reject cycle if header hierarchy is violated."
)

librarian_agent = LlmAgent(
    name="LibrarianAgent",
    role="Grounding Guard",
    system_prompt="Executes RAG queries against existing docs and NotebookLM via MCP to provide contextual citations."
)

competitive_agent = LlmAgent(
    name="CompetitiveAgent",
    role="Differentiator",
    system_prompt="Benchmarks against industry standards (NIST, SPIFFE) and market whitepapers to add Gap Analysis."
)

critical_analyst = LlmAgent(
    name="CriticalAnalyst",
    role="Logic Validator",
    system_prompt="Red-teams logic. Focuses on ZTA, state transitions, and failure modes. You hold Blocker authority."
)

style_agent = LlmAgent(
    name="StyleAgent",
    role="Voice Matcher",
    system_prompt="Refines prose using Few-Shot user examples. Removes AI-fluff to maintain technical PM shorthand."
)
