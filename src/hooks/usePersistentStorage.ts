import { useEffect } from "react";

export function usePersistentStorage() {
  useEffect(() => {
    // Request persistent storage for site
    (async () => {
      if (navigator.storage && navigator.storage.persist) {
        const isPersisted = await navigator.storage.persist();
        console.log(`Persisted storage granted: ${isPersisted}`);
      }
    })();
  }, []);
}
