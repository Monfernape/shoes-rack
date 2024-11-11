module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info"],
      },
    ],
  },
};
