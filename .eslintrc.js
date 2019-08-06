module.exports = {
  "extends": "airbnb",
  "globals": {
    "window": true,
    "fetch": true,
    "document": true,
    "FormData":true
  },
  "rules": {
    "implicit-arrow-linebreak": "off",
    "no-underscore-dangle": "off",
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "arrow-parens":"off",
      }
    }
  ]
};
