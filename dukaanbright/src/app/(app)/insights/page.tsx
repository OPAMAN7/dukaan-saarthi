"use client";
import { useState } from "react";
import { mockInsights } from "@/lib/mockData";
import { formatCurrency, getPriorityColor, getInsightIcon } from "@/lib/utils";
import { AIInsight } from "@/types";

const typeFilters = ["All", "price_increase", "price_decrease", "restock", "clearance", "trending"];
const typeLabels: Record<string, string> = {
  All: "All",
  price_increase: "Price Up",
  price_decrease: "Price Down",
  restock: "Restock",
  clearance: "Clearance",
  trending: "Trending",
};

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  const filtered = activeFilter === "All"
    ? mockInsights
    : mockInsights.filter((i) => i.type === activeFilter);

  const handleApply = (id: string) => {
    setAppliedIds((prev) => new Set([...prev, id]));
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">AI Insights</h1>
        <p className="text-on-surface-variant mt-1 font-medium">
          Smart recommendations to grow your profit — powered by AI
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "High Priority", count: mockInsights.filter(i => i.priority === "high").length, color: "text-red-600", bg: "bg-red-50", icon: "priority_high" },
          { label: "Potential Gain", count: "₹1,915", color: "text-emerald-600", bg: "bg-emerald-50", icon: "trending_up" },
          { label: "Actions Pending", count: mockInsights.length - appliedIds.size, color: "text-amber-600", bg: "bg-amber-50", icon: "pending_actions" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 shadow-card flex items-center gap-4">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${s.color} text-[20px]`}>{s.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-on-surface tracking-tight">{s.count}</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {typeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide transition-all ${
              activeFilter === f
                ? "cta-gradient text-white shadow-card"
                : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container-low"
            }`}
          >
            {typeLabels[f]}
          </button>
        ))}
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((insight: AIInsight) => {
          const applied = appliedIds.has(insight.id);
          return (
            <div
              key={insight.id}
              className={`bg-surface-container-lowest rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 ${applied ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    insight.priority === "high" ? "bg-red-50" : insight.priority === "medium" ? "bg-amber-50" : "bg-emerald-50"
                  }`}>
                    <span className={`material-symbols-outlined text-[20px] ${
                      insight.priority === "high" ? "text-red-500" : insight.priority === "medium" ? "text-amber-500" : "text-emerald-500"
                    }`}>{getInsightIcon(insight.type)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-on-surface">{insight.productName}</p>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide border ${getPriorityColor(insight.priority)}`}>
                      {insight.priority} priority
                    </span>
                  </div>
                </div>
                {applied && (
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 uppercase tracking-wide">
                    ✓ Applied
                  </span>
                )}
              </div>

              <p className="text-base font-extrabold text-on-surface mb-1">{insight.recommendation}</p>
              <p className="text-sm font-medium text-on-surface-variant mb-4">{insight.impact}</p>

              {insight.suggestedPrice && (
                <div className="flex items-center gap-4 mb-5 p-3 bg-surface-container-low rounded-xl">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Current Price</p>
                    <p className="text-lg font-extrabold text-on-surface">{formatCurrency(insight.currentPrice)}</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">arrow_forward</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">Suggested</p>
                    <p className={`text-lg font-extrabold ${insight.suggestedPrice > insight.currentPrice ? "text-emerald-600" : "text-red-600"}`}>
                      {formatCurrency(insight.suggestedPrice)}
                    </p>
                  </div>
                  <div className={`ml-auto px-3 py-1.5 rounded-full text-xs font-extrabold ${
                    insight.suggestedPrice > insight.currentPrice ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}>
                    {insight.suggestedPrice > insight.currentPrice ? "+" : ""}
                    {formatCurrency(insight.suggestedPrice - insight.currentPrice)}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleApply(insight.id)}
                disabled={applied}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] ${
                  applied
                    ? "bg-surface-container text-on-surface-variant cursor-default"
                    : "cta-gradient text-white hover:opacity-90 shadow-card"
                }`}
              >
                {applied ? "Applied ✓" : "Apply Suggestion"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
