const prettier = require("prettier");
const dedent = require("dedent-tabs").default;

const prettierOpts = { parser: "scss", plugins: ["."], tabWidth: 4 };

prettier.resolveConfig();

test("Sorts regular CSS properties", () => {
    expect(
        prettier.format(
            `.test {
                width: 200px;
                height: 10px; 
                font-size: 14px;
            }`,
            prettierOpts
        )
    ).toBe(
        dedent`
            .test {
                font-size: 14px;
                height: 10px;
                width: 200px;
            }\n`
    );
});

test("Sorts SCSS import statements to the top", () => {
    expect(
        prettier.format(
            `.card {
                background: $base;
                display: inline-block;
                @include shadow-level(1);
                margin-bottom: $m;
                padding: $m;
                @include transition(all 250ms);
                vertical-align: top;
                width: 100%;
            }`,
            prettierOpts
        )
    ).toBe(
        dedent`
            .card {
                @include shadow-level(1);
                @include transition(all 250ms);
                background: $base;
                display: inline-block;
                margin-bottom: $m;
                padding: $m;
                vertical-align: top;
                width: 100%;
            }\n`
    );
});

describe("Sorts properties with values that use", () => {
    test("Interpolation", () => {
        expect(
            prettier.format(
                `a {
                    margin-left: -#{$grid-default-gutter / 2}; 
                    height: 1rem;
                }`,
                prettierOpts
            )
        ).toBe(
            dedent`
                a {
                    height: 1rem;
                    margin-left: -#{$grid-default-gutter / 2};
                }\n`
        );
    });

    test("Variables", () => {
        expect(
            prettier.format(
                `.test {
                    grid-template-columns: 277px 277px;
                    margin-top: $s;
                    grid-column-gap: 20px;
                    grid-row-gap: 20px;
                    display: grid;
                    grid-row: auto auto;
                }`,
                prettierOpts
            )
        ).toBe(
            dedent`
                .test {
                    display: grid;
                    grid-column-gap: 20px;
                    grid-row: auto auto;
                    grid-row-gap: 20px;
                    grid-template-columns: 277px 277px;
                    margin-top: $s;
                }\n`
        );
    });
});
