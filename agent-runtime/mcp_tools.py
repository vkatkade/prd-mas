# Mock implementation of google.adk.tools.mcp for the sake of the project architecture
import asyncio

class MCPToolset:
    def __init__(self, server_url: str):
        self.server_url = server_url

    async def call_tool(self, tool_name: str, params: dict):
        print(f"Calling MCP tool {tool_name} at {self.server_url} with params: {params}")
        # Simulate network latency
        await asyncio.sleep(1)
        
        if tool_name == "gws_docs_get_content":
            return {"schema": "Mock Google Doc Template", "headers": ["1. Overview", "2. Infrastructure Requirements"]}
        elif tool_name == "notebooklm_query":
            return {"grounding_data": f"Mock Technical Context for {params.get('query')}"}
        elif tool_name == "gws_drive_search":
            return {"files": ["Architecture_V2.pdf", "Data_Flow_Diagram.png"]}
        else:
            return {"result": f"Mock result for {tool_name}"}

# Initialize the MCP toolsets as defined in the PRD
workspace_tools = MCPToolset(server_url="http://workspace-mcp-svc:8080")
# Exposes: gws_docs_get_content, gws_drive_search

notebooklm_tools = MCPToolset(server_url="http://notebooklm-mcp-svc:8080")
# Exposes: query_notebook
