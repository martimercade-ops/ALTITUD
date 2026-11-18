export const CONSENT_STORAGE_KEY = "cookie-consent-v1";

export const CONSENT_FLAG_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(
  CONSENT_STORAGE_KEY,
)}))document.documentElement.setAttribute("data-consent","")}catch(e){}`;
