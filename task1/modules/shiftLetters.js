const shiftLetters = (chank, shiftValue) => {
  const chankStringArr = chank.toString().trim().split("");

  const charCodes = chankStringArr.map((element) => {
    const uniCode = element.charCodeAt();
    let shiftedUnicode = uniCode + shiftValue;

    if (uniCode >= 65 && uniCode <= 90) {
      if (shiftedUnicode > 90) {
        shiftedUnicode = 64 + (shiftedUnicode - 90);
      }
      if (shiftedUnicode < 65) {
        shiftedUnicode = 91 - (65 - shiftedUnicode);
      }
    } else if (uniCode >= 97 && uniCode <= 122) {
      if (shiftedUnicode > 122) {
        shiftedUnicode = 96 + (shiftedUnicode - 122);
      }
      if (shiftedUnicode < 97) {
        shiftedUnicode = 123 - (97 - shiftedUnicode);
      }
    } else shiftedUnicode = uniCode;

    return String.fromCharCode(shiftedUnicode);
  });

  const shiftedChank = charCodes.join("");
  return shiftedChank;
};

module.exports = shiftLetters;
