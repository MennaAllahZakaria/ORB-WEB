const MANUS_HOST_SUFFIXES = [".manus.space", ".manus.computer"];

export function isManusHost(hostname: string) {
  return MANUS_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
}

export function orbImageUrl(localFileName: string, manusStoragePath: string, hostname = typeof window === "undefined" ? "" : window.location.hostname) {
  return isManusHost(hostname) ? manusStoragePath : `/images/${localFileName}`;
}
