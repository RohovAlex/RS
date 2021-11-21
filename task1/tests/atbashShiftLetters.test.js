const shiftLetters = require("../modules/atbashShiftLetters");

describe("Function shiftLetters", () => {
  test("should not changes symbols not from English alphabet", () => {
    expect(shiftLetters("123!@#Привет")).toBe("123!@#Привет");
  });

  test("should return string with shifted english letters", () => {
    expect(shiftLetters("Hello, World!")).toBe("Svool, Dliow!");
  });

  test("should not change string length", () => {
    expect(shiftLetters("Hello, World!").length).toBe("Hello, World!".length);
  });
});
