const atbashShiftLetters = require("../modules/atbashShiftLetters");

describe("Function atbashShiftLetters", () => {
  test("should not changes symbols not from English alphabet", () => {
    expect(atbashShiftLetters("123!@#Привет")).toBe("123!@#Привет");
  });

  test("should return string with shifted english letters", () => {
    expect(atbashShiftLetters("Hello, World!")).toBe("Svool, Dliow!");
  });

  test("should not change string length", () => {
    expect(atbashShiftLetters("Hello, World!").length).toBe(
      "Hello, World!".length
    );
  });
});
