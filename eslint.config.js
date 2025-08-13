import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { js: { ignorePatterns: ["node_modules/**", "dist/**"] } },
  allConfig: { js: { ignorePatterns: ["node_modules/**", "dist/**"] } },
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "**/test/**/*.{ts,tsx}", "**/e2e/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
];
