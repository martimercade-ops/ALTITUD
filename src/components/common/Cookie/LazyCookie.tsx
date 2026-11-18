"use client";

import { useLayoutEffect, useState } from "react";

import { isRobotView } from "@/components/common/robot-view";

import { Cookie } from "./Cookie";

export function LazyCookie() {
  const [robot, setRobot] = useState(false);
  useLayoutEffect(() => {
    if (isRobotView()) setRobot(true);
  }, []);
  return robot ? null : <Cookie />;
}
