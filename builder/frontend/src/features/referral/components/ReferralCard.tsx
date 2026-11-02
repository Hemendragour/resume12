import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Gift } from "lucide-react";

import { CREDITS_QUERY_KEY } from "../../../api/axios";
import { THRONE8_URL } from "../../../config/auth.config";
import { useReferral } from "../hooks/useReferral";
import type { CreditAmounts } from "../services/referral.service";

/** Plain-English names for the credit types a referral can give. */
const CREDIT_LABELS: Record<string, string> = {
  resumeRuns: "AI resume",
  coverRuns: "AI cover letter",
  interview5: "AI interview",
  atsChecks: "ATS check",
};

/** "1 AI resume, 1 AI cover letter and 1 ATS check" */
const describeCredits = (credits: CreditAmounts): string => {
  const parts = Object.entries(credits)
    .filter(([, amount]) => (amount ?? 0) > 0)
    .map(([type, amount]) => `${amount} ${CREDIT_LABELS[type] ?? type}`);

  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
};

/** "Invite friends" panel: share link, progress toward the reward. Hidden until loaded. */
export default function ReferralCard() {
  const { data } = useReferral();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  // A friend joining (or the reward landing) changes the balance: refresh it.
  const count = data?.count;
  const rewardGiven = data?.rewardGiven;
  useEffect(() => {
    if (count === undefined) return;
    void queryClient.invalidateQueries({ queryKey: CREDITS_QUERY_KEY });
  }, [count, rewardGiven, queryClient]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!data) return null;

  const link = `${THRONE8_URL}/signup?ref=${encodeURIComponent(data.code)}`;
  const progress = Math.min(100, Math.round((data.count / data.goal) * 100));
  const message =
    `I'm using Throne8's AI resume builder. Sign up with my link and get a free extra AI resume credit: ${link}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      // Clipboard can be blocked: show the link in a prompt so it can still be copied
      window.prompt("Copy your invite link:", link);
    }
  };

  return (
    <section
      aria-label="Invite friends"
      className="mt-6 rounded-2xl border border-border-popup bg-navbar p-5 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <Gift size={18} className="text-gold" aria-hidden="true" />
        <h2 className="text-base font-bold text-heading">Invite friends, earn credits</h2>
      </div>

      <p className="mt-2 text-sm text-subheading">
        Each friend who signs up with your link gets {describeCredits(data.friendBonus)} free.
        When {data.goal} friends join, you get {describeCredits(data.reward)} free too.
      </p>

      {/* ---------- progress ---------- */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-heading">
            {data.count} of {data.goal} friends joined
          </span>
          {data.rewardGiven && (
            <span className="font-semibold text-gold">Reward added to your credits</span>
          )}
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={data.goal}
          aria-valuenow={data.count}
          aria-label="Friends who joined with your link"
          className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-section-panel"
        >
          <div
            className="h-full rounded-full bg-gold transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ---------- link + actions ---------- */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          readOnly
          value={link}
          aria-label="Your invite link"
          onFocus={(event) => event.currentTarget.select()}
          className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-heading"
        />

        <button
          type="button"
          onClick={() => void copyLink()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-btn px-5 text-sm font-semibold text-btn-text hover:bg-btn-hover"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy link"}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-navbar px-5 text-sm font-semibold text-heading hover:bg-btn-hover-bg"
        >
          Share on WhatsApp
        </a>
      </div>

      <p className="mt-3 text-xs text-subheading">
        Friends need a new account with a verified email. Rewards are credits for creating (AI
        resume, cover letter, interview, ATS check), not edits.
      </p>
    </section>
  );
}
