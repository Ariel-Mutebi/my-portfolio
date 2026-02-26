import { useEffect, useState } from "react";

export function useHashRoute(defaultHash = "#reception") {
  const getHash = () => window.location.hash || defaultHash;
  const [hash, setHash] = useState(getHash);

  useEffect(() => {
    if (!window.location.hash) {
      history.replaceState(null, "", defaultHash);
    }

    const onPopState = () => {
      setHash(getHash());
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onPopState);
    };
  }, [defaultHash]);

  const navigate = (nextHash: string) => {
    if (nextHash === hash) return;
    history.pushState(null, "", nextHash);
    setHash(nextHash);
  };

  return { hash, navigate };
}
