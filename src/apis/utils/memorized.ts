import Cache from "lru-cache";

const MAX_AGE = 10 * 60;
const MAX_SIZE = 100;

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export function memorized<F extends (params: any) => any>(
  func: F,
  { ttl }: { ttl?: number } = {}
): F {
  const cache = new Cache({
    ttl: ttl ?? (MAX_AGE != null ? MAX_AGE * 1_000 : undefined),
    max: MAX_SIZE,
  });

  return function <P, R>(params: P): R {
    const key = JSON.stringify(params);

    if (cache.has(key)) {
      return cache.get(key) as R;
    }

    let response = func(params);

    if (
      typeof response.then === "function" &&
      typeof response.catch === "function"
    ) {
      response = response.catch((error: any) => {
        cache.delete(key);

        throw error;
      });
    }

    cache.set(key, response);

    return response;
  } as F;
}
