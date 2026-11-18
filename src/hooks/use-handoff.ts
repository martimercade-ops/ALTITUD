"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import { onHandoff } from "@/lib/preloader-handoff";

const queue: (() => void)[] = [];
let pumping = false;

const pump = () => {
  const next = queue.shift();
  if (!next) {
    pumping = false;
    return;
  }
  next();
  window.setTimeout(pump, 0);
};

const inTurn = (release: () => void) => {
  queue.push(release);
  if (pumping) return;
  pumping = true;
  window.setTimeout(pump, 0);
};

export const useHandoff = () => {
  const [ready, setReady] = useState(false);

  useEffect(
    () =>
      onHandoff(() => inTurn(() => flushSync(() => setReady(true)))),
    [],
  );

  return ready;
};
