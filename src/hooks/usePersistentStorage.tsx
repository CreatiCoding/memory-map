import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const isSafari = () => {
  return (
    typeof navigator !== "undefined" &&
    /Version\/[\d\\.]+.*Safari/.test(navigator.userAgent)
  );
};

export function usePersistentStorage() {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (!isSafari()) {
      return;
    }

    // Request persistent storage for site
    (async () => {
      if (navigator.storage != null && navigator.storage.persist != null) {
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
