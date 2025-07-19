import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config([
  { ignores: ["**/dist/**", "**/node_modules/**"] },

  // Base configuration for all TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    plugins: {
      "unused-imports": unusedImports,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": "error",
      "linebreak-style": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unsafe-function-type": "warn",
    },
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        project: [
          "./client/tsconfig.app.json",
          "./client/tsconfig.node.json",
          "./server/tsconfig.json",
        ],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Frontend/Client specific configuration
  {
    files: ["client/**/*.{ts,tsx}"],
    extends: [...pluginQuery.configs["flat/recommended"]],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/query": pluginQuery,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // Backend/Server specific configuration
  {
    files: ["server/**/*.{ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
