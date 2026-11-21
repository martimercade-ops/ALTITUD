import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panell — Altitud Digital",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default function PanellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="panell-app min-h-screen bg-[#f4f5f7] text-[#111827]" data-lenis-prevent>
      {children}
    </div>
  );
}
