export default {
    "*.{ts,tsx,html,css,md,json}": [
        "eslint --fix --max-warnings 0 --no-warn-ignored",
        "prettier --write",
    ],
    "packages/fe/**/*.{ts,tsx}": () => "tsc --noEmit -p packages/fe/tsconfig.json",
    "packages/be/**/*.{ts,tsx}": () => "tsc --noEmit -p packages/be/tsconfig.json",
};
