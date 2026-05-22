"use client";

import { CopyButton } from "@/components/leads-tool/shared/CopyButton";
import type { EmailPackResult } from "@/lib/ai/types";

interface EmailResultPanelProps {
  result: EmailPackResult;
}

function EmailBlock({ label: label, body }: { label: string; body: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#1c1917]">{label}</p>
        <CopyButton text={body} label="Copy email" />
      </div>
      <pre className="whitespace-pre-wrap text-sm text-[#44403c] bg-[#fafaf9] border border-[#e7e5e4] rounded-lg p-4 font-sans leading-relaxed">
        {body}
      </pre>
    </div>
  );
}

export function EmailResultPanel({ result }: EmailResultPanelProps) {
  const subjectBlock = result.subjects.map((s, i) => `Option ${i + 1}: ${s}`).join("\n");

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Subject variants */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#1c1917]">Subject Line Variants</p>
          <CopyButton text={subjectBlock} label="Copy all" />
        </div>
        <div className="flex flex-col gap-2">
          {result.subjects.map((subject, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 bg-[#fafaf9] border border-[#e7e5e4] rounded-lg px-4 py-3"
            >
              <p className="text-sm text-[#44403c] flex-1">
                <span className="text-xs font-medium text-[#78716c] mr-2">Option {i + 1}</span>
                {subject}
              </p>
              <CopyButton text={subject} />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e7e5e4]" />

      <EmailBlock label="Initial Email" body={result.initialEmail} />

      <div className="border-t border-[#e7e5e4]" />

      <EmailBlock label="Follow-up 1 — Day 3" body={result.followUp1} />

      <div className="border-t border-[#e7e5e4]" />

      <EmailBlock label="Follow-up 2 — Day 7 (Final Touch)" body={result.followUp2} />
    </div>
  );
}
