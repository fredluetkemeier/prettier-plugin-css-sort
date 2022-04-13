const prettier = require("prettier/parser-postcss");
const postcss = require("postcss");
const postcssScss = require("postcss-scss");
const sorting = require("postcss-sorting");

const preprocess = (text, options) => {
    const result = postcss([
        sorting({ "properties-order": "alphabetical" }),
    ]).process(text, {
        from: undefined,
        syntax: options.parser === "scss" && postcssScss,
    });

    return result.css;
};

module.exports = {
    parsers: {
        css: {
            ...prettier.parsers.css,
            preprocess,
        },
        less: {
            ...prettier.parsers.less,
            preprocess,
        },
        scss: {
            ...prettier.parsers.scss,
            preprocess,
        },
    },
};
