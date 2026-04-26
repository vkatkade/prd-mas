import React from 'react';
import ReactMarkdown from 'react-markdown';

const MOCK_MARKDOWN = `
# Product Requirements Document: Identity-Aware Gateway

## 1. Overview
The Identity-Aware Gateway serves as the primary ingress point for all internal microservices. It enforces Zero-Trust principles by explicitly validating user and workload identity before routing traffic.

## 2. Infrastructure Requirements

### 2.1 Mutual TLS (mTLS)
All traffic between the gateway and downstream services **must** be encrypted via mTLS.
*   **Requirement:** SPIFFE/SPIRE will be used to issue and rotate short-lived certificates.
*   **Edge Case:** If the mTLS handshake fails, the gateway must drop the connection and log a \`TLS_HANDSHAKE_FAILURE\` event to Cloud Logging.

### 2.2 Token Validation
The gateway will intercept all incoming HTTP requests to validate the JWT.
*   **Requirement:** Validate signature against the centralized JWKS endpoint.
*   **Verification (Added by Critical Analyst):** Identity must be verified at every hop. The downstream service must receive the validated context in the \`X-Forwarded-User\` header.
`;

export default function PrdPreview() {
  return (
    <div className="prose prose-invert prose-slate max-w-none">
      <ReactMarkdown>{MOCK_MARKDOWN}</ReactMarkdown>
      
      {/* Typing indicator for "live" drafting effect */}
      <div className="mt-8 flex gap-1">
        <div className="w-2 h-2 rounded-full bg-brand-500/50 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-brand-500/50 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-brand-500/50 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
