"use client";
import { useState } from "react";
import { mockExpenses } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export default function SettingsPage() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [shopName, setShopName] = useState("Rajesh General Store");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({ expiry: true, lowStock: true, aiTips: true });
  const [saved, setSaved] = useState(false);

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  const updateExpense = (id: string, amount: number) => {
    setExpenses(expenses.map((e) => e.id === id ? { ...e, amount } : e));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Settings</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Manage your shop info and preferences</p>
      </div>

      {/* Shop Info */}
      <div className="bg-surface-container-lowest rounded-xl p-7 shadow-card space-y-5">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.15em] text-slate-400">Shop Information</h2>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">Shop Name</label>
            <input
              value={shopName} onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">Language</label>
            <select
              value={language} onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-primary-container/30 transition-all text-on-surface"
            >
              {["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali", "Gujarati"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">Owner Name</label>
          <input
            defaultValue="Rajesh Kumar"
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 transition-all max-w-xs"
          />
        </div>
      </div>

      {/* Monthly Expenses */}
      <div className="bg-surface-container-lowest rounded-xl p-7 shadow-card space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.15em] text-slate-400">Monthly Expenses</h2>
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface-variant">Total</p>
            <p className="text-xl font-extrabold text-on-surface">{formatCurrency(totalExpenses)}</p>
          </div>
        </div>
        <p className="text-xs text-on-surface-variant font-medium -mt-2">
          These expenses are used by AI to calculate your actual profit margin
        </p>
        <div className="space-y-5">
          {expenses.map((exp) => (
            <div key={exp.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">{exp.icon}</span>
                  <span className="text-sm font-bold text-on-surface">{exp.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-on-surface-variant font-medium">₹</span>
                  <input
                    type="number" min="0" value={exp.amount}
                    onChange={(e) => updateExpense(exp.id, Number(e.target.value))}
                    className="w-24 bg-surface-container-low border-none rounded-lg px-3 py-1.5 text-sm font-extrabold text-right outline-none focus:ring-2 focus:ring-primary-container/30 transition-all"
                  />
                </div>
              </div>
              <input
                type="range" min="0" max="30000" step="100" value={exp.amount}
                onChange={(e) => updateExpense(exp.id, Number(e.target.value))}
                style={{ backgroundSize: `${(exp.amount / 30000) * 100}% 100%` }}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-surface-container-lowest rounded-xl p-7 shadow-card space-y-5">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.15em] text-slate-400">Notifications</h2>
        {[
          { key: "expiry", label: "Expiry Date Alerts", desc: "Alert when products are expiring soon" },
          { key: "lowStock", label: "Low Stock Warnings", desc: "Alert when stock falls below minimum" },
          { key: "aiTips", label: "AI Pricing Tips", desc: "Get daily suggestions to boost profit" },
        ].map((n) => (
          <div key={n.key} className="flex items-center justify-between py-3 border-b border-surface-container last:border-0">
            <div>
              <p className="text-sm font-bold text-on-surface">{n.label}</p>
              <p className="text-xs text-on-surface-variant font-medium">{n.desc}</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, [n.key]: !notifications[n.key as keyof typeof notifications] })}
              className={`w-12 h-6 rounded-full transition-all duration-200 relative ${
                notifications[n.key as keyof typeof notifications] ? "cta-gradient" : "bg-surface-container-high"
              }`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                notifications[n.key as keyof typeof notifications] ? "left-7" : "left-1"
              }`} />
            </button>
          </div>
        ))}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-card ${
          saved ? "bg-emerald-500 text-white" : "cta-gradient text-white hover:opacity-90"
        }`}
      >
        {saved ? "✓ Settings Saved!" : "Save Settings"}
      </button>
    </div>
  );
}
