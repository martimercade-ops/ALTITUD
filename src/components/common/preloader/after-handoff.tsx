"use client";

import { Fragment, type ReactNode } from "react";

import { RobotProvider, useRobot } from "@/components/common/robot-view";
import { useHandoff } from "@/hooks/use-handoff";

export interface AfterHandoffProps {
  children: ReactNode;
}

export const AfterHandoff = ({ children }: AfterHandoffProps) => {
  const robot = useRobot();
  const handedOff = useHandoff();
  const ready = handedOff || robot;

  return (
    <div className={ready ? "contents" : "invisible contents"}>
      {ready ? (
        <Fragment key="live">{children}</Fragment>
      ) : (
        <RobotProvider key="held" robot>
          {children}
        </RobotProvider>
      )}
    </div>
  );
};
