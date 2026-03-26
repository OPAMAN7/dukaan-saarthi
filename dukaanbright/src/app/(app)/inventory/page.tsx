"use client";
import { useState } from "react";
import { mockProducts } from "@/lib/mockData";
import { formatCurrency, getStockStatusColor, getStockDotColor } from "@/lib/utils";
import { Product } from "@/types";
import Link from "next/link";

const categories = ["All", "Grains & Flour", "Dairy", "Instant Food", "Beverages", "Personal Care", "Oils & Ghee", "Tea & Coffee"];
const statusFilters = ["All", "healthy", "low", "critical"];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockProducts.filter((p: Product) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    const matchStatus = statusFilter === "All" || p.stockStatus === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Inventory</h1>
          <p className="text-on-surface-variant mt-1 font-medium">
            {filtered.length} products · {mockProducts.filter(p => p.stockStatus !== "healthy").length} need attention
          </p>
        </div>
        <Link
          href="/add-product"
          className="flex items-center gap-2 px-6 py-3 cta-gradient text-white rounded-xl font-bold text-sm shadow-card hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-card flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2.5 rounded-xl flex-1 min-w-[200px]">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-slate-400"
            placeholder="Search products..."
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm font-bold text-on-surface outline-none cursor-pointer"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <div className="flex gap-2">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide transition-all ${
                statusFilter === s
                  ? "cta-gradient text-white shadow-card"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {s === "All" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="text-left px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">Product</th>
                <th className="text-left px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">Category</th>
                <th className="text-right px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">Qty</th>
                <th className="text-right px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">Cost</th>
                <th className="text-right px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">Price</th>
                <th className="text-right px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">AI Suggest</th>
                <th className="text-left px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">Expiry</th>
                <th className="text-left px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-on-surface-variant">Status</th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`border-b border-surface-container hover:bg-surface-container-low transition-colors ${idx % 2 === 0 ? "" : ""}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getStockDotColor(p.stockStatus)}`} />
                      <div>
                        <p className="text-sm font-bold text-on-surface">{p.name}</p>
                        <p className="text-[11px] text-on-surface-variant font-medium">Min: {p.minQuantity} units</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={`text-sm font-extrabold ${p.quantity <= p.minQuantity ? "text-red-600" : "text-on-surface"}`}>
                      {p.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-bold text-on-surface-variant">{formatCurrency(p.costPrice)}</td>
                  <td className="px-4 py-4 text-right text-sm font-bold text-on-surface">{formatCurrency(p.sellingPrice)}</td>
                  <td className="px-4 py-4 text-right">
                    {p.aiSuggestedPrice && p.aiSuggestedPrice !== p.sellingPrice ? (
                      <span className={`text-sm font-extrabold ${p.aiSuggestedPrice > p.sellingPrice ? "text-emerald-600" : "text-red-600"}`}>
                        {formatCurrency(p.aiSuggestedPrice)}
                        <span className="text-[10px] ml-1">{p.aiSuggestedPrice > p.sellingPrice ? "▲" : "▼"}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-on-surface-variant">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {p.expiryDate ? (
                      <div>
                        <p className="text-xs font-bold text-on-surface">{p.expiryDate}</p>
                        {p.daysToExpiry !== undefined && p.daysToExpiry <= 30 && (
                          <p className={`text-[10px] font-extrabold ${p.daysToExpiry <= 7 ? "text-red-600" : "text-amber-600"}`}>
                            {p.daysToExpiry}d left
                          </p>
                        )}
                      </div>
                    ) : <span className="text-xs text-on-surface-variant">—</span>}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wide ${getStockStatusColor(p.stockStatus)}`}>
                      {p.stockStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="p-1.5 text-on-surface-variant hover:text-primary-container hover:bg-surface-container rounded-lg transition-all">
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] text-slate-300 block mb-3">inventory_2</span>
              <p className="font-bold text-sm">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
