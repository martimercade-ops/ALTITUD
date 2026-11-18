import { MobileMenu } from "@/views/mobile-menu";

export interface SiteNavLink {
  label: string;
  href: string;
  /** Agrupa els enllaços del desplegable en columnes */
  group?: string;
}

const GROUP_LABEL: Record<string, string> = {
  marketing: "Màrqueting i creativitat",
  ia: "Intel·ligència artificial",
};

const groupLinks = (links: SiteNavLink[]) => {
  const groups: { key: string; links: SiteNavLink[] }[] = [];
  for (const link of links) {
    const key = link.group ?? "";
    const g = groups.find((x) => x.key === key);
    if (g) g.links.push(link);
    else groups.push({ key, links: [link] });
  }
  return groups;
};

export interface SiteNavItem extends SiteNavLink {
  children?: SiteNavLink[];
  /** Enllaç destacat (punt verd) */
  highlight?: boolean;
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
  "flex h-[56px] items-center rounded-full border border-white/10 bg-[#0b1424]/85 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-md md:h-[60px]";

export const SiteNav = ({
  brand,
  items,
  cta,
  navLabel = "Primary",
  homeHref = "#top",
}: SiteNavProps) => (
  <header className="fixed inset-x-[14px] top-[14px] z-50 flex items-center justify-between gap-4 text-white md:inset-x-[24px] md:top-[24px]">
    <div className="flex items-center gap-3">
      <a href={homeHref} aria-label={brand} className={`${PILL} relative z-[60] gap-2 px-[22px] font-medium md:px-[26px]`}>
        <img src="/assets/altitud/altitud-logo-h.svg" alt="" width={128} height={16} className="block h-[19px] w-auto md:h-[21px]" />
      </a>
      <nav aria-label={navLabel} className={`${PILL} hidden px-2 md:flex`}>
        {items.map((item) =>
          item.children?.length ? (
            <div key={item.href} className="group relative">
              <a
                href={item.href}
                aria-haspopup="true"
                className="flex items-center gap-1.5 rounded-full px-[18px] py-[12px] text-[15px] text-white/80 hover:text-white group-focus-within:text-white"
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
                <div className="flex gap-2 rounded-2xl border border-white/10 bg-[#0b1424] p-2 shadow-[0_24px_60px_rgb(0_0_0/0.55)]">
                  {groupLinks(item.children).map((g) => (
                    <div key={g.key} className="min-w-60">
                      {g.key && (
                        <p className="px-4 pb-1 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
                          {GROUP_LABEL[g.key] ?? g.key}
                        </p>
                      )}
                      <ul>
                        {g.links.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="block rounded-xl px-[16px] py-[12px] text-[15px] text-white/80 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-full px-[18px] py-[12px] text-[15px] hover:text-white ${
                item.highlight ? "text-white" : "text-white/80"
              }`}
            >
              {item.highlight && (
                <span aria-hidden="true" className="relative flex h-[7px] w-[7px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime/70" />
                  <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-accent-lime" />
                </span>
              )}
              {item.label}
            </a>
          ),
        )}
      </nav>
    </div>
    <div className="flex items-center gap-[8px]">
      <a
        href={cta.href}
        className="inline-flex h-[56px] items-center rounded-full bg-white px-[24px] text-[15px] font-medium text-plum md:h-[60px] md:px-[30px] border border-black/10 shadow-[0_8px_30px_rgb(0_0_0/0.12)] hover:bg-white/90"
      >
        {cta.label}
      </a>
      <MobileMenu items={items} cta={cta} label={navLabel} />
    </div>
  </header>
);
