export function validateString(value?: string | string[]): value is string {
  return !(value == null || Array.isArray(value));
}

validateString.message = (value?: string[]) => ({
  message: `값이 올바르지 않습니다. (${value})`,
});
