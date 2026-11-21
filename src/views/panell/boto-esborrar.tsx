"use client";

import { useState } from "react";

export const BotoEsborrar = ({ accio }: { accio: () => Promise<void> }) => {
  const [segur, setSegur] = useState(false);
  return segur ? (
    <form action={accio} className="flex items-center gap-2 text-sm">
      <span className="text-red-700">Segur? No es pot desfer.</span>
      <button type="submit" className="panell-boto !bg-red-600">Sí, esborrar</button>
      <button type="button" onClick={() => setSegur(false)} className="panell-boto panell-boto--clar">No</button>
    </form>
  ) : (
    <button type="button" onClick={() => setSegur(true)} className="self-start text-sm text-red-600 hover:underline">Esborrar lead</button>
  );
};
