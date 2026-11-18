export interface SiteNavContent {
  brand: string;
  items: { label: string; href: string }[];
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
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white"
          >
            {item.label}
          </a>
        ))}
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
