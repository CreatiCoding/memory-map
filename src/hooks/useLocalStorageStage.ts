import { useEffect, useState } from "react";
import localStorage from "../utils/localStorage";

type Pending = undefined;

type NotExists = null;

export function useLocalStorageStage<T>(key: string) {
  const [value, setValue] = useState<T | Pending | NotExists>(undefined);

  useEffect(() => {
    setValue(localStorage.get<T>(key) ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value != null) {
      localStorage.set(key, value);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
