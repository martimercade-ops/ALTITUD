import type { Metadata } from "next";

import { LEGAL_UPDATED, avisLegal, cookiePolicy, privacyPolicy, type LegalPage } from "@/data/mocks/legal";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

import { LegalDocument } from "./legal-document";

const meta = (page: LegalPage): Metadata =>
  generateMetadata({ title: `${page.title} — Altitud Digital`, description: page.intro, url: page.href });

const view = (page: LegalPage) => {
  const View = () => <LegalDocument {...page} updated={LEGAL_UPDATED} />;
  View.displayName = `Legal(${page.slug})`;
  return View;
};

export const privacyPolicyMetadata = meta(privacyPolicy);
export const PrivacyPolicyView = view(privacyPolicy);
export const avisLegalMetadata = meta(avisLegal);
export const AvisLegalView = view(avisLegal);
export const cookiePolicyMetadata = meta(cookiePolicy);
export const CookiePolicyView = view(cookiePolicy);
