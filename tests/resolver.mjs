import { registerHooks } from "node:module";

registerHooks({
  resolve(especificador, contexto, siguiente) {
    return siguiente(especificador === "next/server" ? "next/server.js" : especificador, contexto);
  },
});
