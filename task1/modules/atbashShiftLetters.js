const atbashShiftLetters = (chank) => {
  const chankStringArr = chank.toString().trim().split("");

  const charCodes = chankStringArr.map((element) => {
    const uniCode = element.charCodeAt();
    let shiftedUnicode;

    if (uniCode >= 65 && uniCode <= 90) {
      shiftedUnicode = 90 - (uniCode - 65);
    } else if (uniCode >= 97 && uniCode <= 122) {
      shiftedUnicode = 122 - (uniCode - 97);
    } else shiftedUnicode = uniCode;

    return String.fromCharCode(shiftedUnicode);
  });

  const shiftedChank = charCodes.join("");
  return shiftedChank;
};

module.exports = atbashShiftLetters;
