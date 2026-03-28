"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const categories = [
  "Grains & Flour", "Dairy", "Instant Food", "Beverages",
  "Personal Care", "Oils & Ghee", "Tea & Coffee", "Snacks", "Cleaning", "Other",
];

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", category: "", quantity: "", minQuantity: "",
    costPrice: "", sellingPrice: "", expiryDate: "", barcode: "",
  });
  const [saved, setSaved] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setForm((f) => ({ ...f, barcode: "8901030826409", name: "Parle-G Biscuits 200g", category: "Snacks", costPrice: "22", sellingPrice: "30" }));
      setScanning(false);
    }, 1500);
  };

  const getStockStatus = (quantity: number, minQuantity: number) => {
    if (quantity <= Math.max(1, Math.floor(minQuantity / 2))) return "critical";
    if (quantity <= minQuantity) return "low";
    return "healthy";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const supabase = createClient();
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        router.push("/login?error=auth_required");
        return;
      }

      const { data: shop } = await supabase
        .from("shops")
        .select("id")
        .eq("owner_user_id", user.id)
        .order("created_at", { ascending: true })
        .maybeSingle();
      if (!shop) {
        setErrorMsg("Shop setup not found. Please complete onboarding first.");
        return;
      }

      // Find/create product category for this shop.
      let categoryId: string | null = null;
      if (form.category) {
        const { data: existingCategory } = await supabase
          .from("product_categories")
          .select("id")
          .eq("shop_id", shop.id)
          .eq("name", form.category)
          .maybeSingle();

        if (existingCategory?.id) {
          categoryId = existingCategory.id;
        } else {
          const { data: createdCategory, error: categoryError } = await supabase
            .from("product_categories")
            .insert({ shop_id: shop.id, name: form.category })
            .select("id")
            .single();
          if (categoryError) throw categoryError;
          categoryId = createdCategory.id;
        }
      }

      const quantity = Number(form.quantity || 0);
      const minQuantity = Number(form.minQuantity || 0);
      const stockStatus = getStockStatus(quantity, minQuantity);

      const { error } = await supabase.from("products").insert({
        shop_id: shop.id,
        name: form.name,
        category_id: categoryId,
        barcode: form.barcode || null,
        quantity,
        min_quantity: minQuantity,
        cost_price: Number(form.costPrice || 0),
        selling_price: Number(form.sellingPrice || 0),
        expiry_date: form.expiryDate || null,
        status: stockStatus,
      });

      if (error) throw error;

      setSaved(true);
      setTimeout(() => router.push("/inventory"), 800);
    } catch (error) {
      console.error("Failed to add product:", error);
      setErrorMsg("Could not save product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const profit = form.costPrice && form.sellingPrice
    ? Number(form.sellingPrice) - Number(form.costPrice) : 0;
  const margin = form.costPrice && form.sellingPrice && Number(form.costPrice) > 0
    ? ((profit / Number(form.costPrice)) * 100).toFixed(1) : "0";

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">Add Product</h1>
        <p className="text-on-surface-variant mt-1 font-medium">Fill in details or scan barcode to add quickly</p>
      </div>

      {/* Barcode scan strip */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-card flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${scanning ? "bg-primary-container/20 animate-pulse" : "bg-surface-container-low"}`}>
          <span className="material-symbols-outlined text-primary-container text-[24px]">qr_code_scanner</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-on-surface">Scan Barcode</p>
          <p className="text-xs text-on-surface-variant font-medium">Auto-fill product details from barcode</p>
          {form.barcode && <p className="text-xs font-extrabold text-emerald-600 mt-0.5">✓ Scanned: {form.barcode}</p>}
        </div>
        <button
          type="button"
          onClick={handleScan}
          disabled={scanning}
          className="px-5 py-2.5 cta-gradient text-white rounded-xl font-bold text-sm shadow-card hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
        >
          {scanning ? "Scanning…" : "Scan Now"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl p-7 shadow-card space-y-6">
        {errorMsg && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMsg}
          </div>
        )}
        {/* Row 1: Name + Category */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">
              Product Name *
            </label>
            <input
              name="name" required value={form.name} onChange={handleChange}
              placeholder="e.g. Aashirvaad Atta 5kg"
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 placeholder:text-slate-400 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">
              Category *
            </label>
            <select
              name="category" required value={form.category} onChange={handleChange}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 transition-all text-on-surface"
            >
              <option value="">Select category…</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Row 2: Qty + Min Qty */}
        <div className="grid grid-cols-2 gap-5">
          {[
            { name: "quantity", label: "Quantity (units) *", placeholder: "e.g. 50", type: "number" },
            { name: "minQuantity", label: "Min Stock Alert", placeholder: "e.g. 10", type: "number" },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">{f.label}</label>
              <input
                name={f.name} required={f.name === "quantity"} type={f.type} min="0"
                value={form[f.name as keyof typeof form]} onChange={handleChange} placeholder={f.placeholder}
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 placeholder:text-slate-400 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Row 3: Cost Price + Selling Price */}
        <div className="grid grid-cols-2 gap-5">
          {[
            { name: "costPrice", label: "Cost Price (₹) *", placeholder: "e.g. 210" },
            { name: "sellingPrice", label: "Selling Price (₹) *", placeholder: "e.g. 245" },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">{f.label}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">₹</span>
                <input
                  name={f.name} required type="number" min="0" step="0.01"
                  value={form[f.name as keyof typeof form]} onChange={handleChange} placeholder={f.placeholder}
                  className="w-full bg-surface-container-low border-none rounded-xl pl-8 pr-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 placeholder:text-slate-400 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Profit preview */}
        {profit > 0 && (
          <div className="flex items-center gap-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Profit per unit</p>
              <p className="text-2xl font-extrabold text-emerald-700">₹{profit}</p>
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Margin</p>
              <p className="text-2xl font-extrabold text-emerald-700">{margin}%</p>
            </div>
            <span className="material-symbols-outlined text-emerald-500 ml-auto text-[32px]">trending_up</span>
          </div>
        )}

        {/* Expiry Date */}
        <div className="max-w-xs">
          <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant block mb-2">
            Expiry Date (optional)
          </label>
          <input
            name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange}
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 transition-all text-on-surface"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-card ${
              saved ? "bg-emerald-500 text-white" : "cta-gradient text-white hover:opacity-90"
            }`}
          >
            {saved ? "✓ Product Added! Redirecting…" : submitting ? "Saving..." : "Add to Inventory"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/inventory")}
            className="px-6 py-3.5 rounded-xl font-bold text-sm text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
