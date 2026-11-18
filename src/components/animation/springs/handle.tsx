"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useSpring, SpringConfig, config as _config } from "@react-spring/web";
import { AnimatedVarTextTag } from "./animated-var-text-tag";
import { Tags } from "@/types/springs";

interface SmoothRerenderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  from?: Record<string, any>;
  to?: Record<string, any>;
  delayIn?: number;
  delayOut?: number;
  config?: SpringConfig;
  enabled?: boolean;
  tag?: Tags;
}

export const Handle = memo(
  ({
    children,
    from = { opacity: 0 },
    to = { opacity: 1 },
    delayIn = 0,
    delayOut = 0,
    config = _config.gentle,
    enabled = true,
    tag = "div",
    ...props
  }: SmoothRerenderProps) => {
    const [cachedChildren, setCachedChildren] =
      useState<React.ReactNode>(children);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [rerender, setRerender] = useState(0);
    const isHidden = useRef(false);
    const childrenRef = useRef<React.ReactNode>(children);
    useEffect(() => {
      childrenRef.current = children;
    }, [children]);

    const [springs, api] = useSpring(() => ({
      ...to,
      config,
    }));

    const dataRef = useRef({ from, to, config, delayIn, delayOut });
    const cachedChildrenRef = useRef<React.ReactNode>(cachedChildren);
    useEffect(() => {
      dataRef.current = { from, to, config, delayIn, delayOut };
      cachedChildrenRef.current = cachedChildren;
    });

    useEffect(() => {
      if (!enabled) {
        api.start({
          ...dataRef.current.from,
          config: dataRef.current.config,
          onRest: () => {
            setCachedChildren(childrenRef.current);
            isHidden.current = true;
            setRerender((state) => state + 1);
          },
        });
      }
    }, [enabled, api]);

    useEffect(() => {
      if (!enabled) return;
      if (children === cachedChildrenRef.current && !isHidden.current) return;

      if (isHidden.current) {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
        animateIn();
        return;
      }

      isHidden.current = false;
      api.start({
        ...dataRef.current.from,
        delay: dataRef.current.delayOut,
        config: dataRef.current.config,
        onRest: () => animateIn(),
      });

      function animateIn() {
        setCachedChildren(childrenRef.current);
        isHidden.current = true;
        animationTimeoutRef.current = setTimeout(() => {
          isHidden.current = false;
          api.start({
            ...dataRef.current.to,
            config: dataRef.current.config,
            onRest: () => setRerender((state) => state + 1),
          });
        }, dataRef.current.delayIn);
      }
    }, [children, enabled, rerender, api]);

    useEffect(() => {
      return () => {
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
      };
    }, []);

    return (
      <AnimatedVarTextTag tag="div" style={{ ...springs }} {...props}>
        {cachedChildren}
      </AnimatedVarTextTag>
    );
  },
);

Handle.displayName = "Handle";
