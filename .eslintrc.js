module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                semi: true,
                tabWidth: 4,
                useTabs: false,
                endOfLine: "lf",
                arrowParens: "always",
                trailingComma: "none",
                jsxSingleQuote: false,
                jsxBracketSameLine: true,
                htmlWhitespaceSensitivity: "css"
            }
        ],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    }
};
