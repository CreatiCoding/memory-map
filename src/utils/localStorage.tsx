import { isBrowser } from "./browser";

export function createLocalStorage() {
  return {
    get: function <T = string>(key: string): T | undefined {
      if (!isBrowser()) {
        return;
      }

      const value = localStorage.getItem(key);

      if (value == null) {
        return;
      }

      try {
        const object = JSON.parse(value);

        if ("key" in object && "value" in object) {
          if (key === object.key) {
            return object.value;
          }
        }

        return value as T;
      } catch {
        return value as T;
      }
    },

    set: function <T = string>(key: string, value: T) {
      if (!isBrowser()) {
        return;
      }

      localStorage.setItem(
        key,
        JSON.stringify({
          key,
          value,
        })
      );
    },

    remove: (key: string) => {
      if (!isBrowser()) {
        return;
      }

      localStorage.removeItem(key);
    },
  };
}

export default createLocalStorage();

// declare global {
//   interface Window {
//     ll: any;
//   }
// }

// if (typeof window !== "undefined") {
//   window.ll = createLocalStorage();
// }
