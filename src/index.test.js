const prettier = require("prettier");

test("Sorts simple CSS", () => {
    expect(
        prettier.format(".test {height: 10px; font-size: 14px;}", {
            parser: "css",
            plugins: ["."],
        })
    ).toBe(".test {\n  font-size: 14px;\n  height: 10px;\n}\n");
});

test("Sorts simple SCSS", () => {
    expect(
        prettier.format(
            "a{margin-left: -#{$grid-default-gutter / 2}; height: 1rem;}",
            {
                parser: "scss",
                plugins: ["."],
            }
        )
    ).toBe(
        "a {\n  height: 1rem;\n  margin-left: -#{$grid-default-gutter / 2};\n}\n",
        "sorts given SCSS"
    );
});
