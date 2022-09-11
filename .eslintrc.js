module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: require.resolve("./tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
  },
};
