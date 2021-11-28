const fs = require("fs");
const { pipeline } = require("stream");

const streamsGenerator = require("./modules/streamsGenerator");

const params = process.argv.splice(2);

if (params.length < 2) {
  process.stderr.write("Config is missed or wrong format");
  process.exit(1);
}

const filterC = params.filter((el) => el === "-c");
const filterI = params.filter((el) => el === "-i");
const filterO = params.filter((el) => el === "-o");

if (filterC.length > 1) {
  process.stderr.write("Config consists duplicated option '-c'");
  process.exit(1);
}
if (filterI.length > 1) {
  process.stderr.write("Config consists duplicated option '-i'");
  process.exit(1);
}
if (filterO.length > 1) {
  process.stderr.write("Config consists duplicated option '-o'");
  process.exit(1);
}

const config = params[1];
const configArgs = config.split("-");

const inputFilename = params[3];
const outputFilename = params[5];

let rs;
if (inputFilename) {
  rs = fs.createReadStream(inputFilename);
} else {
  rs = process.stdin;
}

let ws;
if (inputFilename) {
  ws = fs.createWriteStream(outputFilename, { flags: "a+" });
} else {
  ws = process.stdout;
}

const streamsArr = streamsGenerator(configArgs);

pipeline(rs, ...streamsArr, ws, (err) => {
  console.log("Error: ", err);
});
