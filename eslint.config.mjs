import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
  },

  {
    files: [
      "**/*.config.{js,cjs,mjs}",
      "**/scripts/**/*.{js,cjs,mjs}",
      "**/ecosystem.config.js",
    ],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },

  js.configs.recommended,

  // TypeScript (flat config)
  ...tseslint.configs.recommended,

  // React + Next rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...(nextPlugin.configs["core-web-vitals"]?.rules ?? {}),
    },
  },
];
