const shiftLetters = require("../modules/shiftLetters");

describe("Function shiftLetters", () => {
  test("should not changes symbols not from English alphabet", () => {
    expect(shiftLetters("123!@#Привет", 1)).toBe("123!@#Привет");
  });

  test("should return string with shifted english letters", () => {
    expect(shiftLetters("Hello, World!", 1)).toBe("Ifmmp, Xpsme!");
  });

  test("should work with different shift values", () => {
    expect(shiftLetters("Hello, World!", 8)).toBe("Pmttw, Ewztl!");
  });
});
