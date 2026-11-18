"use client";

import Link from "next/link";
import { animated, useTransition } from "@react-spring/web";

import { CookieButton } from "./CookieButton";
import { useCookieStore } from "./cookieStore";

export const CookieBanner = () => {
  const consent = useCookieStore((s) => s.consent);
  const hydrated = useCookieStore((s) => s.hydrated);
  const modalOpen = useCookieStore((s) => s.modalOpen);
  const acceptAll = useCookieStore((s) => s.acceptAll);
  const rejectAll = useCookieStore((s) => s.rejectAll);
  const openModal = useCookieStore((s) => s.openModal);

  const shouldShow = (!hydrated || consent === null) && !modalOpen;

  const transitions = useTransition(shouldShow, {
    initial: null,
    from: { opacity: 0, y: 24 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 24 },
    config: { tension: 280, friction: 32 },
  });

  return transitions((style, show) =>
    show ? (
      <animated.section
        aria-label="Cookie consent"
        data-cookie-banner=""
        style={{
          opacity: style.opacity,
          transform: style.y.to((v) => `translateY(${v}px)`),
        }}
        className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 rounded-xl border border-foreground/10 bg-background/95 p-5 font-sans text-foreground shadow-2xl backdrop-blur-xl sm:bottom-12 sm:left-auto sm:right-12 sm:w-[420px] sm:p-6"
      >
        <h2 className="text-base font-medium leading-snug sm:text-lg">
          Aquest web utilitza galetes
        </h2>
        <p className="text-sm leading-relaxed text-foreground/70">
          Fem servir galetes perquè el web funcioni i per entendre com s&apos;utilitza. Accepta-les totes, rebutja les no essencials o tria per categories. Consulta la nostra{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground/70"
          >
            política de privacitat
          </Link>
          .
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <CookieButton onClick={acceptAll}>Acceptar-les totes</CookieButton>
          <CookieButton variant="secondary" onClick={rejectAll}>
            Rebutjar-les totes
          </CookieButton>
          <button
            type="button"
            onClick={openModal}
            className="px-2 py-2 text-sm font-medium leading-none text-foreground underline underline-offset-2 hover:text-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Gestionar preferències
          </button>
        </div>
      </animated.section>
    ) : null,
  );
};
