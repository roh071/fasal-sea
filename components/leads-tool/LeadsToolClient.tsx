"use client";

import { useState } from "react";
import { ToolTabBar } from "./shared/ToolTabBar";
import { DiscoveryForm } from "./discovery/DiscoveryForm";
import { DiscoveryResults } from "./discovery/DiscoveryResults";
import { EmailGeneratorForm } from "./email/EmailGeneratorForm";
import { EmailResultPanel } from "./email/EmailResultPanel";
import { DeepResearchForm } from "./deep-research/DeepResearchForm";
import { DeepResearchResults } from "./deep-research/DeepResearchResults";
import type { CompanyDiscoveryItem, EmailPackResult, DeepResearchItem } from "@/lib/ai/types";
import type { DiscoveryInput, EmailGenInput, DeepResearchInput } from "@/lib/validations/leads-tool.schema";

const TABS = [
  { id: "discovery", label: "Company Discovery" },
  { id: "email", label: "Email Generator" },
  { id: "deep-research", label: "Deep Research" },
];

export function LeadsToolClient() {
  const [activeTab, setActiveTab] = useState("discovery");

  // Discovery state
  const [discoveryResults, setDiscoveryResults] = useState<CompanyDiscoveryItem[]>([]);
  const [discoveryLoading, setDiscoveryLoading] = useState(false);
  const [discoveryError, setDiscoveryError] = useState<string | null>(null);

  // Email state
  const [emailResult, setEmailResult] = useState<EmailPackResult | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Deep research state
  const [deepResults, setDeepResults] = useState<DeepResearchItem[]>([]);
  const [deepLoading, setDeepLoading] = useState(false);
  const [deepStreaming, setDeepStreaming] = useState(false);
  const [deepError, setDeepError] = useState<string | null>(null);

  async function handleDiscovery(data: DiscoveryInput) {
    setDiscoveryResults([]);
    setDiscoveryError(null);
    setDiscoveryLoading(true);

    try {
      const res = await fetch("/api/ai/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setDiscoveryError(err.error ?? "Something went wrong");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") break;
          try {
            const item = JSON.parse(payload) as CompanyDiscoveryItem;
            if ("error" in item) { setDiscoveryError((item as { error: string }).error); break; }
            setDiscoveryResults((prev) => [...prev, item]);
          } catch { /* skip malformed chunk */ }
        }
      }
    } catch (err) {
      setDiscoveryError(err instanceof Error ? err.message : "Network error");
    } finally {
      setDiscoveryLoading(false);
    }
  }

  async function handleEmail(data: EmailGenInput) {
    setEmailResult(null);
    setEmailError(null);
    setEmailLoading(true);

    try {
      const res = await fetch("/api/ai/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) { setEmailError(json.error ?? "Something went wrong"); return; }
      setEmailResult(json as EmailPackResult);
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Network error");
    } finally {
      setEmailLoading(false);
    }
  }

  async function handleDeepResearch(data: DeepResearchInput) {
    setDeepResults([]);
    setDeepError(null);
    setDeepLoading(true);
    setDeepStreaming(true);

    try {
      const res = await fetch("/api/ai/deep-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setDeepError(err.error ?? "Something went wrong");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") { setDeepStreaming(false); break; }
          try {
            const item = JSON.parse(payload) as DeepResearchItem;
            if ("error" in item) { setDeepError((item as { error: string }).error); break; }
            setDeepResults((prev) => [...prev, item]);
          } catch { /* skip malformed chunk */ }
        }
      }
    } catch (err) {
      setDeepError(err instanceof Error ? err.message : "Network error");
    } finally {
      setDeepLoading(false);
      setDeepStreaming(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <ToolTabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "discovery" && (
        <div>
          <DiscoveryForm onSubmit={handleDiscovery} isLoading={discoveryLoading} />
          {discoveryError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {discoveryError}
            </div>
          )}
          <DiscoveryResults items={discoveryResults} isLoading={discoveryLoading} />
        </div>
      )}

      {activeTab === "email" && (
        <div>
          <EmailGeneratorForm onSubmit={handleEmail} isLoading={emailLoading} />
          {emailError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {emailError}
            </div>
          )}
          {emailResult && <EmailResultPanel result={emailResult} />}
        </div>
      )}

      {activeTab === "deep-research" && (
        <div>
          <DeepResearchForm onSubmit={handleDeepResearch} loading={deepLoading} />
          {deepError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {deepError}
            </div>
          )}
          <div className="mt-6">
            <DeepResearchResults items={deepResults} streaming={deepStreaming} />
          </div>
        </div>
      )}
    </div>
  );
}
