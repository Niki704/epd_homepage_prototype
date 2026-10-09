export const CONSENT_STORAGE_KEY = "epd-cookie-consent-v1";

export type ConsentChoice = "accepted" | "rejected";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  return storedConsent === "accepted" || storedConsent === "rejected"
    ? storedConsent
    : null;
}

export function setConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
}

export function clearConsent(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
}
