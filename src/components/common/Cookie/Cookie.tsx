"use client";

import { useEffect } from "react";

import { CookieBanner } from "./CookieBanner";
import { CookiePreferencesModal } from "./CookiePreferencesModal";
import { useCookieStore } from "./cookieStore";

export const Cookie = () => {
  const hydrate = useCookieStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <CookieBanner />
      <CookiePreferencesModal />
    </>
  );
};
