import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import reactPlugin from "eslint-plugin-react";
import importSortPlugin from "eslint-plugin-simple-import-sort";
import effectorPlugin from "eslint-plugin-effector";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";

export default tseslint.config(
    { ignores: ["dist"] },
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
        },
    },
    {
        files: ["packages/fe/**/*.{ts,tsx}"],
        ignores: ["packages/fe/vite.config.ts"],
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ["./packages/fe/tsconfig.app.json"],
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
            ...effectorPlugin.configs.recommended.rules,
            ...effectorPlugin.configs.scope.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            // general
            "no-console": "warn",
            "object-shorthand": "warn",
            "no-useless-catch": "warn",
            "no-empty-pattern": "warn",
            "no-unneeded-ternary": "warn",
            "no-nested-ternary": "off",
            "object-curly-spacing": ["warn", "always"],
            indent: "off",
            "no-multi-spaces": "warn",
            "eol-last": ["warn", "always"],
            "no-multiple-empty-lines": ["warn", { max: 2, maxEOF: 0, maxBOF: 0 }],
            "comma-spacing": "warn",
            "spaced-comment": ["warn", "always", { markers: ["/"] }],
            "no-duplicate-imports": "warn",
            "no-trailing-spaces": "warn",
            "no-unsafe-optional-chaining": "off",
            // typescript
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-empty-function": "warn",
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/ban-types": [
                "warn",
                { extendDefaults: true, types: { "{}": false } },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            // react
            "jsx-quotes": ["warn", "prefer-double"],
            "react/jsx-equals-spacing": ["warn", "never"],
            "react/jsx-no-literals": "off",
            "react/jsx-fragments": ["warn"],
            "react/jsx-no-target-blank": "warn",
            "react/jsx-first-prop-new-line": ["warn", "multiline"],
            "react/jsx-closing-bracket-location": ["warn", "tag-aligned"],

            "react/prop-types": "off",
            "react/no-unused-prop-types": "warn",
            "react/no-deprecated": "warn",
            "react/no-children-prop": "warn",
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
