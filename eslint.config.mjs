import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import reactPlugin from "eslint-plugin-react";
import importSortPlugin from "eslint-plugin-simple-import-sort";
import effectorPlugin from "eslint-plugin-effector";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";

export default tseslint.config(
    { ignores: ["**/dist/*"] },
    {
        files: ["packages/be/**/*.{ts,tsx}"],
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.node,
            parserOptions: {
                project: ["./packages/be/tsconfig.json"],
            },
        },
        rules: {
            "require-await": "off",
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
            "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
        },
    },
    {
        files: ["packages/fe/vite.config.ts"],
        languageOptions: {
            parserOptions: {
                project: ["packages/fe/tsconfig.vite.json"],
            },
        },
    },
    {
        ...reactPlugin.configs.flat.recommended,
        files: ["packages/fe/**/*.{ts,tsx}"],
        ignores: ["packages/fe/vite.config.ts"],
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
        settings: { react: { version: "detect" } },
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                project: ["packages/fe/tsconfig.app.json"],
            },
        },
        plugins: {
            react: reactPlugin,
            "simple-import-sort": importSortPlugin,
            effector: effectorPlugin,
            "react-hooks": reactHooksPlugin,
            "react-refresh": reactRefreshPlugin,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...effectorPlugin.configs.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            // general
            "no-console": "warn",
            "no-useless-catch": "warn",
            "no-empty-pattern": "warn",
            "no-unneeded-ternary": "warn",
            "spaced-comment": ["warn", "always", { markers: ["/", "TODO", "!", "?"] }],
            "no-duplicate-imports": "warn",
            "no-unsafe-optional-chaining": "warn",
            // typescript
            "@typescript-eslint/only-throw-error": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "warn",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unused-expressions": "warn",
            "@typescript-eslint/no-unsafe-argument": "warn",
            "@typescript-eslint/no-empty-function": "warn",
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/no-floating-promises": "off",
            "@typescript-eslint/no-misused-promises": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
            // react
            ...reactPlugin.configs["jsx-runtime"].rules,
            "react/jsx-no-target-blank": "warn",
            "react/no-unused-prop-types": "warn",
            "react/self-closing-comp": "warn",
            // imports
            "simple-import-sort/imports": [
                "warn",
                {
                    groups: [
                        ["^\\u0000"],
                        ["^lodash", "^react", "^@mui", "^@?\\w"],
                        [
                            "^alerts",
                            "^api",
                            "^assets",
                            "^components",
                            "^config",
                            "^hooks",
                            "^logger",
                            "^modals",
                            "^shared",
                            "^stores",
                            "^uikit",
                            "^utils",
                        ],
                        ["^\\."],
                    ],
                },
            ],
        },
    },
);
