export function isBrowser() {
  if (typeof window === "undefined") {
    return false;
  }

  return true;
}
