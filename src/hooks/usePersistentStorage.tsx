import { useEffect, useState } from "react";
import { css } from "@emotion/react";

export function usePersistentStorage() {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Request persistent storage for site
    (async () => {
      if (navigator.storage && navigator.storage.persist) {
        const isPersisted = await navigator.storage.persist();
        setEnabled(isPersisted);
      } else {
        setEnabled(true);
      }
    })();
  }, []);

  const enabledPersistentStorage = (
    <>
      {!enabled && (
        <div
          css={css`
            position: fixed;
            top: 0;
            right: 0;
          `}
        >
          <>persistent storage enabled: {String(enabled)}</>
        </div>
      )}
    </>
  );

  return [enabledPersistentStorage];
}
