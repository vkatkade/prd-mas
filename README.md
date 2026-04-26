# The Infrastructure Architect (PRD Authoring MAS)

Welcome to **The Infrastructure Architect**—a sophisticated, "Zero-Touch" Multi-Agent System (MAS) built on ADK 2.0. This application is designed to transform high-level technical intent into high-fidelity Product Requirement Documents (PRDs) by grounding generation in your organization's architectural "DNA".

## 🎯 User Experience Overview

Writing comprehensive technical PRDs is traditionally a manual, time-consuming process prone to architectural blind spots. This application flips that paradigm:

1. **Zero-Touch Authoring:** Instead of writing from scratch, you simply provide a link to a structural Google Doc template and some URLs to existing architecture reference documents. 
2. **The SME Agent Squad:** Behind the scenes, a hierarchy of specialized AI agents takes over. A *Structure Agent* extracts your intent, a *Librarian Agent* grounds the draft in deep technical context via RAG, and a *Competitive Agent* adds market differentiation.
3. **Automated Red-Teaming:** As the document drafts in real-time, the *Critical Analyst* agent actively red-teams the logic. If it detects violations (e.g., a missing Zero-Trust Identity check), it acts as a gatekeeper, blocking the pipeline and forcing a re-draft until the architecture is compliant.
4. **Live Observability:** Through a sleek, glassmorphic UI, you can watch the pipeline unfold. You'll see which agent is currently working, read the live stream of the markdown PRD as it generates, and monitor the "Critique Log" for any architectural warnings triggered during the drafting loops.
5. **Seamless Export:** Once the *Style Agent* finalizes the tone, one click exports the fully-formatted PRD directly back to Google Workspace.

---

## 🚀 Getting Started

### Prerequisites
* **Google Cloud Project** with Vertex AI, Cloud Run, Firestore, and Secret Manager enabled.
* **Node.js 20+** (for frontend development)
* **Python 3.11+** (for backend development)

### Local Installation

**1. Clone and Setup Environment**
\`\`\`bash
git clone <repository-url>
cd prd-mas
\`\`\`

**2. Provision Cloud Resources**
Ensure you are authenticated with \`gcloud auth login\` and have set your active project. Run the included provisioning script to scaffold Firestore and your Service Accounts:
\`\`\`bash
./setup_gcp.sh
\`\`\`

**3. Run the Backend API (FastAPI + ADK 2.0)**
\`\`\`bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
\`\`\`

**4. Run the Frontend UI (React + Vite)**
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
The application will now be running at \`http://localhost:5173\`.

---

## 💡 Sample User Example: Building an "Identity-Aware Gateway" PRD

Imagine you are tasked with writing a PRD for a new internal API Gateway. Here is how you use the application to build it in minutes:

### Step 1: Session Setup
1. Navigate to \`http://localhost:5173\`.
2. **Template URL:** Paste the URL of your company's blank Google Doc PRD template (e.g., \`https://docs.google.com/document/d/your-template-id\`).
3. **Reference Architecture URLs:** Paste a link to a NotebookLM guide that explains your company's standard authentication flow.
4. Click **"Initialize MAS Pipeline"**.

### Step 2: Watch the Pipeline Dashboard
The screen will transition to the Pipeline Dashboard. 
* You will see the **Structure Agent** light up as it ingests your template.
* Next, the **Librarian Agent** will spin up, pulling in the authentication rules from the NotebookLM link you provided.

### Step 3: The Red-Team Verification
As the PRD drafts on the right-hand side of your screen, keep an eye on the **Critique & Blocker Log** on the left.
* **Warning Appears:** The *Critical Analyst* agent interrupts the flow: *"Blocker: Section 2.2 lacks an explicit JWT revocation path. ZTA principle violation."*
* You will see the pipeline automatically kick the draft back to the Structure Agent with this feedback.
* On the next pass, the PRD updates in real-time, automatically adding a new sub-bullet explaining how SPIFFE/SPIRE will handle token revocation. The Critical Analyst gives the green light.

### Step 4: Export
Once the *Style Agent* finishes matching the document to your team's tone, click the **Export to Docs** button in the top right corner. The MAS will push the finalized markdown back into your Google Workspace, fully formatted and ready for human review.
