"use client";

import { useEffect, useId, useState } from "react";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import type { SiteNavItem, SiteNavLink } from "@/views/site-nav";

export interface MobileMenuProps {
  items: SiteNavItem[];
  cta: SiteNavLink;
  label: string;
}

export const MobileMenu = ({ items, cta, label }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelId = useId();
  const lenis = useScroll((s) => s.lenis);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Tancar el menú" : "Obrir el menú"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/10 bg-[#0b1424]/85 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-md"
      >
        <span aria-hidden="true" className="relative block h-[14px] w-[22px]">
          <span
            className={`absolute left-0 h-[2px] w-[22px] rounded bg-white transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-[2px] w-[22px] rounded bg-white transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <div
        id={panelId}
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[55] flex flex-col bg-[#0b1424]/97 px-[24px] pb-[32px] pt-[100px] backdrop-blur-xl transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label={label} className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {items.map((item, i) => {
              const hasChildren = !!item.children?.length;
              const isOpen = expanded === item.href;
              return (
                <li
                  key={item.href}
                  className="border-b border-white/10"
                  style={{
                    transition: "opacity 400ms ease, transform 400ms ease",
                    transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(12px)",
                  }}
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.href)}
                        className="flex w-full items-center justify-between py-[18px] text-left text-[26px] font-light tracking-tight text-white"
                      >
                        {item.label}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 10 6"
                          className={`h-[8px] w-[13px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <ul className="overflow-hidden">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                onClick={close}
                                tabIndex={isOpen ? 0 : -1}
                                className="block py-[11px] pl-[4px] text-[18px] text-white/70 hover:text-white"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                          <li className="pb-4" />
                        </ul>
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={close}
                      className="block py-[18px] text-[26px] font-light tracking-tight text-white"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <a
          href={cta.href}
          onClick={close}
          className="mt-[24px] flex h-[56px] items-center justify-center rounded-full bg-white text-[16px] font-medium text-plum"
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
};
