module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
        "comma-dangle": [
            "error",
            "never",
        ],
        "indent": [
            "error",
            4,
        ],
        "quotes": [
            "error",
            "single", 
            {
                "allowTemplateLiterals": true
            }
        ],
        "semi": [
            "error",
            "always",
        ],
        "no-unused-vars": [
            "warn",
        ],
        "no-console": 0,
        "eol-last": [
            "error", 
            "always"
        ]
    },
    "globals": {
        "$": true,
        "jQuery": true,
    }
};