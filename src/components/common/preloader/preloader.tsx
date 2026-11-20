"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { animated, to, useSpring } from "@react-spring/web";

import { isRobotView } from "@/components/common/robot-view";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { markHandoff } from "@/lib/preloader-handoff";
import { warmMedia } from "@/lib/warm-media";
import { maskStyle } from "@/utils/mask";

import {
  FINALE_LAYER_DEPTH,
  FINALE_IMAGE_QUALITY,
  FINALE_IMAGE_SIZES,
  HERO_STAGE_ATTRIBUTE,
} from "./finale";

export interface PreloaderImage {
  src: string;
  tilt: number;
}

export interface PreloaderProps {
  markSrc: string;
  label: string;
  cards: readonly PreloaderImage[];
  finale: { src: string };
}

const HOLD_AT = 0.72;
const MAX_WAIT = 2500;
const WARM_BUDGET = 3000;

const CARD_LEAD = 120;
const CARD_INTERVAL = 170;
const FINALE_HOLD = 280;

const FILL_CONFIG = { tension: 60, friction: 30 };
const FINISH_CONFIG = { tension: 150, friction: 30, clamp: true };
const HANDOFF_CONFIG = { tension: 210, friction: 34, clamp: true };
const CARD_CONFIG = { tension: 190, friction: 24 };
const EXPAND_CONFIG = { tension: 80, friction: 16, clamp: true };
const LEAVE_CONFIG = { tension: 320, friction: 30, clamp: true };
const RELEASE_AT = 0.35;

const DECORATIVE_TEXT = "before:content-[attr(data-text)]";

const CARD_SLOT =
  "h-[16.25rem] w-[13.25rem] md:h-[22rem] md:w-[18rem] lg:h-[25rem] lg:w-[20.625rem]";

export const Preloader = ({
  markSrc,
  label,
  cards,
  finale,
}: PreloaderProps) => {
  const total = cards.length + 1;
  const [target, setTarget] = useState(0);
  const [dealt, setDealt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [gone, setGone] = useState(false);
  useLayoutEffect(() => {
    // La introducció només es mostra la primera vegada de cada visita
    let vist = false;
    try {
      vist = sessionStorage.getItem("altitud-intro") === "1";
      sessionStorage.setItem("altitud-intro", "1");
    } catch {}
    if (!isRobotView() && !vist) return;
    markHandoff();
    setGone(true);
  }, []);
  const reduced = useRef(false);
  const stageRef = useRef<HTMLSpanElement | null>(null);
  const slotRef = useRef<HTMLSpanElement | null>(null);
  const deckRef = useRef<HTMLSpanElement | null>(null);

  const fill = useSpring({
    progress: target,
    config: target === 1 ? FINISH_CONFIG : FILL_CONFIG,
    onRest: () => {
      if (target === 1) setDone(true);
    },
  });

  const [handoff, handoffApi] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    veil: 1,
    config: HANDOFF_CONFIG,
  }));

  const finaleShown = dealt >= total;
  const finaleIn = useSpring({
    opacity: finaleShown ? 1 : 0,
    scale: finaleShown ? 1 : 0.82,
    y: finaleShown ? 0 : 48,
    config: CARD_CONFIG,
  });

  const [box, boxApi] = useSpring(() => ({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    config: EXPAND_CONFIG,
  }));

  const [aspect, setAspect] = useState<number | null>(null);
  const [layer, setLayer] = useState<Size>({ width: 0, height: 0 });
  const finaleImageRef = useRef<HTMLImageElement | null>(null);
  const readAspect = useCallback(() => {
    const image = finaleImageRef.current;
    if (image && image.naturalWidth > 0 && image.naturalHeight > 0) {
      setAspect(image.naturalWidth / image.naturalHeight);
    }
  }, []);
  const fitLayer = useCallback(
    (stage: Rect) => {
      if (!aspect) return;
      const { width, height } = coverPlacement(stage, aspect);
      setLayer({ width, height });
    },
    [aspect],
  );
  useEffect(() => {
    readAspect();
  }, [readAspect]);
  useEffect(() => {
    if (expanding) return;
    const fit = () => fitLayer(measureStage());
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [fitLayer, expanding]);

  const [panel, panelApi] = useSpring(() => ({
    opacity: 1,
    config: LEAVE_CONFIG,
  }));

  useEffect(() => {
    if (expanding) return;
    const place = () => {
      const rect = deckRef.current?.getBoundingClientRect();
      if (!rect) return;
      boxApi.set({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [boxApi, expanding]);

  useEffect(() => {
    const { stop, start } = useScroll.getState();
    stop();
    window.scrollTo(0, 0);
    return () => start();
  }, []);

  useEffect(() => {
    if (gone) useScroll.getState().start();
  }, [gone]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      markHandoff();
      setGone(true);
    }, 12000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) {
      setDealt(total);
      return;
    }

    const timers = Array.from({ length: total }, (_, index) =>
      window.setTimeout(
        () => setDealt(index + 1),
        CARD_LEAD + index * CARD_INTERVAL,
      ),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [total]);

  useEffect(() => {
    let cancelled = false;
    const creep = window.setInterval(() => {
      setTarget((value) => (value >= HOLD_AT ? value : value + 0.12));
    }, 240);

    const finish = () => {
      if (!cancelled) setLoaded(true);
    };

    Promise.all([
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true }),
          ),
      document.fonts?.ready ?? Promise.resolve(),
    ]).then(finish);
    const failsafe = window.setTimeout(finish, MAX_WAIT);

    return () => {
      cancelled = true;
      window.clearInterval(creep);
      window.clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let handle = 0;

    const begin = () => {
      if (cancelled) return;
      const start = () => {
        if (!cancelled) void warmMedia(undefined, WARM_BUDGET);
      };
      handle =
        window.requestIdleCallback?.(start, { timeout: 2000 }) ??
        window.setTimeout(start, 500);
    };

    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", begin);
      window.cancelIdleCallback?.(handle);
    };
  }, []);

  useEffect(() => {
    if (!loaded || dealt < total) return;
    const timer = window.setTimeout(
      () => setTarget(1),
      reduced.current ? 0 : FINALE_HOLD,
    );
    return () => window.clearTimeout(timer);
  }, [loaded, dealt, total]);

  const flyToHeader = useCallback(() => {
    const stage = stageRef.current;
    const slot = slotRef.current;
    if (!stage || !slot) return;

    const from = stage.getBoundingClientRect();
    const to = slot.getBoundingClientRect();
    handoffApi.start({
      x: to.left + to.width / 2 - (from.left + from.width / 2),
      y: to.top + to.height / 2 - (from.top + from.height / 2),
      scale: to.width / from.width,
      veil: 0,
      immediate: reduced.current,
    });
  }, [handoffApi]);

  const leave = useCallback(() => {
    if (reduced.current) markHandoff();
    let left = false;
    panelApi.start({
      opacity: 0,
      immediate: reduced.current,
      onChange: ({ value }) => {
        if (typeof value.opacity === "number" && value.opacity <= RELEASE_AT) {
          markHandoff();
        }
      },
      onRest: () => {
        markHandoff();
        if (left) return;
        left = true;
        setGone(true);
      },
    });
  }, [panelApi]);

  const expand = useCallback(() => {
    setExpanding(true);
    flyToHeader();

    let grown = false;
    const stage = measureStage();
    fitLayer(stage);
    boxApi.start({
      ...stage,
      immediate: reduced.current,
      onRest: () => {
        if (grown) return;
        grown = true;
        useScroll.getState().start();
        window.requestAnimationFrame(() => {
          const settled = measureStage();
          fitLayer(settled);
          boxApi.set(settled);
          leave();
        });
      },
    });
  }, [boxApi, fitLayer, flyToHeader, leave]);

  useEffect(() => {
    if (done) expand();
  }, [done, expand]);

  if (gone) return null;

  return (
    <animated.div
      data-preloader=""
      className="fixed inset-0 z-[60] text-white"
      role="status"
      aria-live="polite"
      style={{ opacity: panel.opacity }}
    >
      <span className="sr-only">{label}</span>

      <span
        aria-hidden="true"
        className="absolute inset-0 block bg-black"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex h-header items-center px-4 opacity-0 sm:px-8"
      >
        <span ref={slotRef} className="block h-4 w-[1.625rem]" />
      </span>

      <animated.span
        aria-hidden="true"
        style={{ opacity: handoff.veil }}
        className="absolute inset-x-0 bottom-6 z-30 flex items-end justify-between px-4 text-xs uppercase leading-body tracking-nav text-white/60 sm:px-8 lg:bottom-8"
      >
        <span data-text={label} className={DECORATIVE_TEXT} />
        <animated.span
          data-text={fill.progress.to(
            (value) =>
              `${Math.round(value * 100)
                .toString()
                .padStart(2, "0")}%`,
          )}
          className={DECORATIVE_TEXT}
        />
      </animated.span>

      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span ref={deckRef} className={`relative block ${CARD_SLOT}`}>
          {cards.map((card, index) => (
            <DeckCard
              key={card.src}
              src={card.src}
              tilt={card.tilt}
              shown={index < dealt}
              cleared={expanding}
            />
          ))}
        </span>
      </div>

      <animated.span
        aria-hidden="true"
        style={{
          opacity: finaleIn.opacity,
          transform: to(
            [finaleIn.y, finaleIn.scale],
            (y, scale) => `translate3d(0, ${y}px, 0) scale(${scale})`,
          ),
          transformOrigin: to(
            [box.left, box.top, box.width, box.height],
            (left, top, width, height) =>
              `${left + width / 2}px ${top + height / 2}px`,
          ),
          clipPath: to(
            [box.left, box.top, box.width, box.height],
            (left, top, width, height) =>
              `inset(${top}px calc(100% - ${left + width}px) calc(100% - ${top + height}px) ${left}px)`,
          ),
        }}
        className="absolute inset-0 z-10 block overflow-hidden"
      >
        <animated.span
          style={{
            width: layer.width,
            height: layer.height,
            transform: to(
              [box.left, box.top, box.width, box.height],
              (left, top, width, height) => {
                if (!aspect || layer.width === 0) return "scale(0)";
                const drawn = coverPlacement(
                  { left, top, width, height },
                  aspect,
                );
                return `translate3d(${drawn.left}px, ${drawn.top}px, 0) scale(${drawn.width / layer.width})`;
              },
            ),
          }}
          className="absolute left-0 top-0 block origin-top-left"
        >
          <Image
            ref={finaleImageRef}
            src={finale.src}
            alt=""
            fill
            priority
            quality={FINALE_IMAGE_QUALITY}
            sizes={FINALE_IMAGE_SIZES}
            onLoad={readAspect}
            className="object-cover"
          />
        </animated.span>
      </animated.span>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <animated.span
          ref={stageRef}
          aria-hidden="true"
          style={{
            x: handoff.x,
            y: handoff.y,
            scale: handoff.scale,
          }}
          className="relative block aspect-[52/32] w-[46vw] max-w-[22rem] sm:w-[34vw] lg:w-[26vw]"
        >
          <span
            className="absolute inset-0 block bg-white opacity-20"
            style={maskStyle(markSrc)}
          />
          <animated.span
            className="absolute inset-0 block"
            style={{
              clipPath: fill.progress.to(
                (value) => `inset(${(1 - value) * 100}% 0 0 0)`,
              ),
            }}
          >
            <span
              className="absolute inset-0 block bg-white"
              style={maskStyle(markSrc)}
            />
          </animated.span>
        </animated.span>
      </div>
    </animated.div>
  );
};

interface Size {
  width: number;
  height: number;
}

interface Rect extends Size {
  left: number;
  top: number;
}

const coverPlacement = (frame: Rect, aspect: number): Rect => {
  const layerHeight = frame.height * FINALE_LAYER_DEPTH;
  const wide = frame.width / Math.max(layerHeight, 1) > aspect;
  const width = wide ? frame.width : layerHeight * aspect;
  const height = wide ? frame.width / aspect : layerHeight;
  const centreX = frame.left + frame.width / 2;
  const centreY = frame.top + frame.height - layerHeight / 2;
  return {
    left: centreX - width / 2,
    top: centreY - height / 2,
    width,
    height,
  };
};

const measureStage = (): Rect => {
  const stage = document.querySelector<HTMLElement>(
    `[${HERO_STAGE_ATTRIBUTE}]`,
  );
  const rect = stage?.getBoundingClientRect();
  if (rect && rect.width > 0) {
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }
  return {
    left: 0,
    top: 0,
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
  };
};

interface DeckCardProps {
  src: string;
  tilt: number;
  shown: boolean;
  cleared: boolean;
}

const DeckCard = ({ src, tilt, shown, cleared }: DeckCardProps) => {
  const style = useSpring({
    opacity: shown && !cleared ? 1 : 0,
    scale: shown ? 1 : 0.82,
    rotate: shown ? tilt : tilt * 1.8,
    y: shown ? 0 : 48,
    config: CARD_CONFIG,
  });

  return (
    <animated.span
      style={style}
      className="absolute inset-0 block overflow-hidden"
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        quality={85}
        sizes="(max-width: 767px) 60vw, 24vw"
        className="object-cover"
      />
    </animated.span>
  );
};
