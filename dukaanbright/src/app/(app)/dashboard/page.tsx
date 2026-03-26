"use client";
import { mockStats, mockProducts, mockChartData, mockInsights } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import Link from "next/link";

const alertProducts = mockProducts.filter(
  (p) => p.stockStatus === "low" || p.stockStatus === "critical"
).slice(0, 3);

const expiringProducts = mockProducts.filter(
  (p) => p.daysToExpiry !== undefined && p.daysToExpiry <= 30
).slice(0, 3);

export default function DashboardPage() {
  const stats = mockStats;

  return (
    <div className="space-y-10">
      {/* Hero Greeting */}
      <section className="animate-fade-in-up">
        <h2 className="text-4xl font-extrabold text-primary tracking-tight">
          Good Morning, Rajesh
        </h2>
        <p className="text-on-surface-variant mt-1 text-lg font-medium">
          Your shop is doing well.{" "}
          <span className="text-on-surface font-bold">
            {stats.lowStockCount + stats.expiringCount} items
          </span>{" "}
          need your attention today.
        </p>
      </section>

      {/* KPI Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up animate-delay-100">
        {[
          { label: "Today's Munafa", value: formatCurrency(stats.todayProfit), icon: "currency_rupee", color: "text-emerald-600", bg: "bg-emerald-50", change: "+12.5%" },
          { label: "Today's Revenue", value: formatCurrency(stats.todayRevenue), icon: "point_of_sale", color: "text-blue-600", bg: "bg-blue-50", change: "+8.2%" },
          { label: "Low Stock Items", value: stats.lowStockCount.toString(), icon: "warning", color: "text-amber-600", bg: "bg-amber-50", change: "Reorder soon" },
          { label: "Near Expiry", value: stats.expiringCount.toString(), icon: "alarm", color: "text-red-600", bg: "bg-red-50", change: "Act today" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">{kpi.label}</span>
              <div className={`w-8 h-8 ${kpi.bg} rounded-lg flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${kpi.color} text-[18px]`}>{kpi.icon}</span>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-on-surface tracking-tight">{kpi.value}</p>
            <p className={`text-xs font-bold mt-1 ${kpi.color}`}>{kpi.change}</p>
          </div>
        ))}
      </section>

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left: Chart + Alerts */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Revenue chart */}
          <div className="bg-surface-container-lowest rounded-xl p-7 shadow-card animate-fade-in-up animate-delay-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400 mb-1">Weekly Revenue</h3>
                <p className="text-2xl font-extrabold text-on-surface tracking-tight">This Week</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary-container inline-block"></span>Revenue</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block"></span>Profit</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockChartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: "#6f797c" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#bec8cb" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(val) => [formatCurrency(Number(val)), ""]}
                  contentStyle={{ fontFamily: "Manrope", fontSize: 12, fontWeight: 700, borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                />
                <Bar dataKey="revenue" fill="#006778" radius={[6, 6, 0, 0]} />
                <Bar dataKey="profit" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Low Stock */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card animate-fade-in-up animate-delay-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-[20px]">warning</span>
                  <h3 className="text-sm font-extrabold text-on-surface">Low Stock</h3>
                </div>
                <Link href="/inventory" className="text-xs font-bold text-primary-container hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {alertProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-surface-container last:border-0">
                    <div>
                      <p className="text-xs font-bold text-on-surface truncate max-w-[140px]">{p.name}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium">{p.quantity} units left</p>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide ${p.stockStatus === "critical" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                      {p.stockStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiring Soon */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card animate-fade-in-up animate-delay-400">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 text-[20px]">alarm</span>
                  <h3 className="text-sm font-extrabold text-on-surface">Expiring Soon</h3>
                </div>
                <Link href="/inventory" className="text-xs font-bold text-primary-container hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {expiringProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-surface-container last:border-0">
                    <div>
                      <p className="text-xs font-bold text-on-surface truncate max-w-[140px]">{p.name}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium">Expires: {p.expiryDate}</p>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide ${(p.daysToExpiry ?? 99) <= 7 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                      {p.daysToExpiry}d
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Monthly goal + Top insights */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Monthly goal */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card animate-fade-in-up animate-delay-200">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400 mb-4">Monthly Goal</h3>
            <p className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
              {stats.monthlyProgress}%
            </p>
            <p className="text-xs font-medium text-on-surface-variant mb-3">
              of {formatCurrency(stats.monthlyGoal)} target
            </p>
            <div className="w-full h-2.5 bg-surface-container-low rounded-full overflow-hidden">
              <div
                className="h-full cta-gradient rounded-full transition-all duration-1000"
                style={{ width: `${stats.monthlyProgress}%` }}
              />
            </div>
            <p className="text-xs font-bold text-emerald-600 mt-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              On track to hit target!
            </p>
          </div>

          {/* Top AI insights */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-card animate-fade-in-up animate-delay-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-on-surface">Top AI Tips</h3>
              <Link href="/insights" className="text-xs font-bold text-primary-container hover:underline">See all</Link>
            </div>
            <div className="space-y-3">
              {mockInsights.slice(0, 3).map((insight) => (
                <div key={insight.id} className={`p-3 rounded-xl border ${insight.priority === "high" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}>
                  <p className="text-xs font-extrabold text-on-surface">{insight.productName}</p>
                  <p className="text-[11px] font-medium text-on-surface-variant mt-0.5">{insight.recommendation}</p>
                  <p className={`text-[10px] font-bold mt-1.5 ${insight.priority === "high" ? "text-red-600" : "text-amber-600"}`}>
                    {insight.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
