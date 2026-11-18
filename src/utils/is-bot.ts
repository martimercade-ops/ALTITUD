import { headers } from "next/headers";

import { isBotUserAgent } from "@/utils/bot-ua";

export const isBot = async (): Promise<boolean> => {
  const headersList = await headers();
  return isBotUserAgent(headersList.get("user-agent"));
};
