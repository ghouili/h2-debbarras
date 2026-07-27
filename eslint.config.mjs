import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y";
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
        fetch: "readonly",
        URL: "readonly",
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
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...(nextPlugin.configs["core-web-vitals"]?.rules ?? {}),
      ...Object.fromEntries(
        Object.entries(jsxA11y.configs.recommended.rules).map(([ruleName]) => [
          ruleName,
          "warn",
        ]),
      ),
      "jsx-a11y/label-has-for": "off",
      "jsx-a11y/label-has-associated-control": ["warn", { assert: "either" }],
      "jsx-a11y/control-has-associated-label": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/anchor-has-content": "error",
    },
  },
];
