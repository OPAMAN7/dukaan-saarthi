import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="w-20 h-20 cta-gradient rounded-2xl flex items-center justify-center mx-auto shadow-card">
          <span className="material-symbols-outlined text-white text-[40px]">storefront</span>
        </div>
        <div>
          <h1 className="text-6xl font-extrabold text-on-surface tracking-tight">404</h1>
          <p className="text-xl font-bold text-on-surface mt-2">Page not found</p>
          <p className="text-on-surface-variant font-medium mt-1">
            This page does not exist in your shop.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 cta-gradient text-white rounded-xl font-bold text-sm shadow-card hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
