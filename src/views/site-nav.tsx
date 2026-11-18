export interface SiteNavLink {
  label: string;
  href: string;
}

export interface SiteNavItem extends SiteNavLink {
  children?: SiteNavLink[];
}

export interface SiteNavContent {
  brand: string;
  items: SiteNavItem[];
  cta: { label: string; href: string };
}

export interface SiteNavProps extends SiteNavContent {
  navLabel?: string;
  homeHref?: string;
}

const PILL =
  "flex h-11 items-center rounded-full border border-white/10 bg-black/30 backdrop-blur-md";

export const SiteNav = ({
  brand,
  items,
  cta,
  navLabel = "Primary",
  homeHref = "#top",
}: SiteNavProps) => (
  <header className="fixed inset-x-4 top-4 z-50 flex items-center justify-between gap-4 text-white md:inset-x-6 md:top-6">
    <div className="flex items-center gap-3">
      <a href={homeHref} aria-label={brand} className={`${PILL} gap-2 px-5 font-medium`}>
        <img src="/assets/altitud/altitud-logo-h.svg" alt="" width={128} height={16} className="block h-4 w-auto" />
      </a>
      <nav aria-label={navLabel} className={`${PILL} hidden px-2 md:flex`}>
        {items.map((item) =>
          item.children?.length ? (
            <div key={item.href} className="group relative">
              <a
                href={item.href}
                aria-haspopup="true"
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/80 hover:text-white group-focus-within:text-white"
              >
                {item.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                  className="h-1.5 w-2.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                >
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="min-w-60 rounded-2xl border border-white/10 bg-[#0b0d16]/90 p-2 shadow-lg backdrop-blur-md">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        className="block rounded-xl px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white"
            >
              {item.label}
            </a>
          ),
        )}
      </nav>
    </div>
    <a
      href={cta.href}
      className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-medium text-plum shadow-sm hover:bg-white/90"
    >
      {cta.label}
    </a>
  </header>
);
