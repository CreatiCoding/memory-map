import { env } from "./env";

export function ensureEnv(key: string) {
  const processEnvValue = process.env[key];
  const envValue = env[key];

  const value = processEnvValue ?? envValue;

  if (value == null) {
    throw new Error(`key(${key})가 제공되지 않았습니다.`);
  }

  return value;
}
