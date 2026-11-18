"use client";

import { useEffect, useRef, useState, type ComponentProps, type ComponentType } from "react";
import type React from "react";
import TextEngine from "spring-text-engine";

import { useRobot } from "./robot-view";

const PAINT_AS_ENGINE = {
  transform: "translate(0)",
  display: "flex",
  flexWrap: "wrap",
  whiteSpace: "pre-wrap",
} as const;

const alignOf = (className = "") =>
  /(^|\s|:)text-(left|center|right|start|end|justify)(\s|$)/.test(className)
    ? undefined
    : /(^|\s)justify-center(\s|$)/.test(className)
      ? "center"
      : /(^|\s)justify-end(\s|$)/.test(className)
        ? "right"
        : undefined;

const LAZY_MARGIN = "150% 0px 150% 0px";

type RobotTextProps = ComponentProps<typeof TextEngine> & {
  lazy?: boolean;
};

const Plain = ({ tag, className, mode, children, innerRef }: RobotTextProps & { innerRef?: React.Ref<HTMLElement> }) => {
  const Tag = (tag ?? "div") as unknown as ComponentType<Record<string, unknown>>;
  return (
    <Tag
      ref={innerRef}
      className={className}
      style={{
        ...PAINT_AS_ENGINE,
        textAlign: alignOf(className),
        visibility: mode === "progress" ? "hidden" : undefined,
      }}
    >
      {children}
    </Tag>
  );
};

const LazyEngine = (props: RobotTextProps) => {
  const { lazy: _lazy, ...engine } = props;
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setNear(true); },
      { rootMargin: LAZY_MARGIN },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  if (near) return <TextEngine {...engine} />;
  return <Plain {...props} innerRef={ref} />;
};

export const RobotText = (props: RobotTextProps) => {
  const robot = useRobot();
  if (robot) return <Plain {...props} />;
  if (props.lazy) return <LazyEngine {...props} />;
  const { lazy: _lazy, ...engine } = props;
  return <TextEngine {...engine} />;
};
