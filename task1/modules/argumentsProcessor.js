module.exports = (params) => {
  const filterC = params.filter((el) => el === "-c" || el === "--config");
  const filterI = params.filter((el) => el === "-i" || el === "--input");
  const filterO = params.filter((el) => el === "-o" || el === "--output");

  if (filterC.length > 1) {
    process.stderr.write("Parameters contains duplicated option config");
    process.exit(1);
  }
  if (filterI.length > 1) {
    process.stderr.write("Parameters contains duplicated option for input");
    process.exit(1);
  }
  if (filterO.length > 1) {
    process.stderr.write("Parameters contains duplicated option for output");
    process.exit(1);
  }
  const configIndex =
    params.findIndex((el) => el === "-c" || el === "--config") + 1;

  const inputIndex =
    params.findIndex((el) => el === "-i" || el === "--input") + 1;

  const outputIndex =
    params.findIndex((el) => el === "-o" || el === "--output") + 1;

  const config = params[configIndex];

  const inputFilename = params[inputIndex];
  const outputFilename = params[outputIndex];

  return { config, inputFilename, outputFilename };
};
