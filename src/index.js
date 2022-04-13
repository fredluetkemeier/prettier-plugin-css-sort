const prettier = require("prettier/parser-postcss");
const postcss = require("postcss");
const postcssScss = require("postcss-scss");
const sorting = require("postcss-sorting");

const preprocess = (text, _options) => {
    const result = postcss([
        sorting({
            order: [{ type: "at-rule", name: "include" }],
            "properties-order": "alphabetical",
        }),
    ]).process(text, {
        from: undefined,
        syntax: postcssScss,
    });

    return result.css;
};

module.exports = {
    parsers: {
        scss: {
            ...prettier.parsers.scss,
            preprocess,
        },
    },
};
