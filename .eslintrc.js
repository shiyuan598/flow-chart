module.exports = {
    root: true,
    env: {
        node: true
    },
    globals: {
        jsPlumb: true
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
                endOfLine: "auto",
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
