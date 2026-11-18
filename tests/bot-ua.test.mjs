import { test } from "node:test";
import assert from "node:assert/strict";

import { isBotUserAgent } from "../src/utils/bot-ua.ts";

const CHROME =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const FIREFOX = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0";

test("reconoce buscadores, medidores y rastreadores de IA", () => {
  for (const ua of [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (Linux; Android 11) Chrome-Lighthouse",
    "Mozilla/5.0 (compatible; bingbot/2.0)",
    "Mozilla/5.0 AppleWebKit/537.36 (compatible; GPTBot/1.1)",
    "ClaudeBot/1.0",
    "PerplexityBot/1.0",
  ]) {
    assert.equal(isBotUserAgent(ua), true, ua);
  }
});

test("no confunde navegadores reales con robots", () => {
  for (const ua of [CHROME, SAFARI, FIREFOX, "", null, undefined]) {
    assert.equal(isBotUserAgent(ua), false, String(ua));
  }
});
