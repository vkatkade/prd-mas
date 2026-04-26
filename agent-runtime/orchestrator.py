import asyncio
from agents import (
    Context, 
    structure_agent, 
    librarian_agent, 
    competitive_agent, 
    critical_analyst, 
    style_agent
)
from mcp_tools import workspace_tools, notebooklm_tools

class ProjectContextManager:
    def __init__(self):
        self.contexts = {}
        
    def get_context(self, session_id: str) -> Context:
        if session_id not in self.contexts:
            self.contexts[session_id] = Context(session_id)
        return self.contexts[session_id]

class SequentialAgent:
    """The Master Orchestrator (TPM Lead)"""
    def __init__(self, name: str, sub_agents: list, context_manager: ProjectContextManager):
        self.name = name
        self.sub_agents = sub_agents
        self.context_manager = context_manager

    async def execute_pipeline(self, session_id: str, prd_url: str, ref_docs: list[str]):
        print(f"[{self.name}] Initializing session {session_id}")
        ctx = self.context_manager.get_context(session_id)
        
        # 1. Full Context Ingestion
        print(f"[{self.name}] Running context ingestion via MCP...")
        template = await workspace_tools.call_tool("gws_docs_get_content", {"url": prd_url})
        await ctx.save_artifact("prd_template_schema", template)
        
        for doc in ref_docs:
            grounding = await notebooklm_tools.call_tool("notebooklm_query", {"query": "architecture patterns", "doc": doc})
            await ctx.save_artifact("architecture_grounding", grounding)
            
        # 2. The Verification Loop (from PRD Section 5)
        print(f"[{self.name}] Starting Agent Pipeline...")
        
        # Step A: Structure Draft
        draft = await structure_agent.run(ctx)
        
        # Step B: Librarian & Competitive augment the draft
        draft = await librarian_agent.run(ctx, input_data=draft)
        draft = await competitive_agent.run(ctx, input_data=draft)
        
        # Step C: Verification Loop with Critical Analyst
        critique = await critical_analyst.run(ctx, input_data=draft)
        retry_count = 0
        
        while critique.has_blockers and retry_count < 3:
            print(f"[{self.name}] Validation Blocked! Triggering re-draft loop. Retry: {retry_count + 1}")
            draft = await structure_agent.retry(ctx, feedback=critique.details)
            critique = await critical_analyst.run(ctx, input_data=draft)
            retry_count += 1
            
        if critique.has_blockers:
            print(f"[{self.name}] WARNING: Proceeding with blockers after max retries!")
            
        # Step D: Final Polish
        final_output = await style_agent.run(ctx, input_data=draft)
        
        print(f"[{self.name}] Pipeline Completed.")
        return final_output

master_orchestrator = SequentialAgent(
    name="TPMOrchestrator",
    sub_agents=[
        structure_agent,
        librarian_agent,
        competitive_agent,
        critical_analyst,
        style_agent,
    ],
    context_manager=ProjectContextManager(),
)

# Example local test run
if __name__ == "__main__":
    async def run_test():
        result = await master_orchestrator.execute_pipeline(
            session_id="test-session-123",
            prd_url="https://docs.google.com/document/d/mock-template",
            ref_docs=["notebooklm-doc-1"]
        )
        print("\n=== Final Result ===")
        print(result)

    asyncio.run(run_test())
