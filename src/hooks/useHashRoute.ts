import { useEffect, useState } from "react";

/**
 * Store URL has in a reactive state, expose method to set URL hash.
 */
export function useHashRoute(defaultHash = "#reception") {
  const getHash = () => window.location.hash || defaultHash;
  const [hash, setHash] = useState(getHash);
  const syncHash = () => setHash(getHash);

  useEffect(() => {
    if (!window.location.hash) {
      history.replaceState(null, "", defaultHash);
    }

    window.addEventListener("popstate", syncHash);
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("popstate", syncHash);
      window.removeEventListener("hashchange", syncHash);
    };
  }, [defaultHash]);

  const navigate = (nextHash: string) => {
    if (nextHash === hash) return;
    history.pushState(null, "", nextHash);
    syncHash();
  };

  return { hash, navigate };
}
