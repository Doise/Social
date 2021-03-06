module.exports = {
    extends: [
        "airbnb-typescript/base",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:jsdoc/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
    ],
    parserOptions: {
        project: "./tsconfig.json",
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "windows"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                selector: "variable",
                types: ["boolean"],
                format: ["StrictPascalCase"],
                prefix: ["is", "should", "are", "must", "has", "can", "did", "will", "force", "enable", "require"],
            },
            {
                selector: "variable",
                types: ["array"],
                format: ["strictCamelCase"],
                suffix: ["s", "Array", "List"],
            },
            {
                selector: "variable",
                types: ["function"],
                modifiers: ["exported"],
                format: ["StrictPascalCase"],
                prefix: [
                    "add",
                    "are",
                    "bond",
                    "build",
                    "check",
                    "concat",
                    "create",
                    "delete",
                    "disable",
                    "divide",
                    "does",
                    "enable",
                    "execute",
                    "find",
                    "finish",
                    "fix",
                    "get",
                    "grant",
                    "handle",
                    "has",
                    "initialize",
                    "is",
                    "list",
                    "merge",
                    "mount",
                    "multiply",
                    "onChange",
                    "onError",
                    "parse",
                    "preValidate",
                    "register",
                    "remove",
                    "run",
                    "save",
                    "search",
                    "send",
                    "set",
                    "sort",
                    "split",
                    "start",
                    "strip",
                    "subtract",
                    "sum",
                    "throw",
                    "transform",
                    "update",
                    "validate",
                    "verify",
                    "warn",
                    "login",
                    "serialize",
                    "deserialize",
                    "toggle"
                ],
            },
        ],
    },
};
