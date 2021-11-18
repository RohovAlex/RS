const fs = require("fs");
const { pipeline } = require("stream");

const streamsGenerator = require("./modules/streamsGenerator");
const argumentsProcessor = require("./modules/argumentsProcessor");
const configProcessor = require("./modules/configProcessor");

const params = process.argv.splice(2);

const { config, inputFilename, outputFilename } = argumentsProcessor(params);

const configArgs = configProcessor(config);

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
  if (err) {
    console.log("Error: ", err);
  } else console.log("Pipeline succeeded.");
});
