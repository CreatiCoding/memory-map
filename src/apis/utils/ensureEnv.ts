export function ensureEnv(key: string) {
  const value = process.env[key];

  if (value == null) {
    throw new Error(`key(${key})가 제공되지 않았습니다.`);
  }

  return value;
}
