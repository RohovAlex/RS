module.exports = (config) => {
  const validValues = ["C1", "C0", "R1", "R0", "A"];
  let invalidValuesCounter = 0;
  configArr = config.split("-");

  configArr.forEach((el) => {
    if (!validValues.includes(el)) {
      ++invalidValuesCounter;
    }
  });

  if (invalidValuesCounter) {
    process.stderr.write("Your config contains wrong values");
    process.exit(1);
  } else return configArr;
};
