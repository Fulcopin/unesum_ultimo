// eslint.config.js
export default [
    {
      files: ["controllers/**/*.js", "config/**/*.js", "models/**/*.js"],
      languageOptions: {
        ecmaVersion: 2021,
        globals: {
          // Definir variables globales específicas de Node.js
          require: "readonly",
          module: "readonly",
          process: "readonly",
          __dirname: "readonly"
        }
      },
     "rules": {
  "no-console": ["warn", { "allow": ["warn", "error", "log"] }]
}

    }
  ];
  