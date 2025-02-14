import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["node_modules/", "public/", ".next/"], // Ignore unnecessary directories
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "no-undef": "off", // Prevents global variable errors
      "no-unused-vars": "warn", // Warns for unused variables instead of error
      "@typescript-eslint/no-explicit-any": "off", // Allows 'any' type in TypeScript
    },
  },
];
