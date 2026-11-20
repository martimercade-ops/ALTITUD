"use client";

import { useEffect, useRef, useState } from "react";
import type { TeamMember } from "@/views/team";
import { TeamCard } from "@/views/team-cards";

/** L'equip apareix d'un en un quan la secció entra a la pantalla o hi entra el ratolí */
export const TeamGrid = ({ members }: { members: TeamMember[] }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <ul ref={ref} onPointerEnter={() => setOn(true)} className={`equip-graella grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${on ? "equip-graella--on" : ""}`}>
      {members.map((m, i) => (
        <li key={m.name} className="equip-entra" style={{ ["--i" as string]: i }}>
          <TeamCard m={m} />
        </li>
      ))}
    </ul>
  );
};
