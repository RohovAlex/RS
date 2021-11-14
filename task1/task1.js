const fs = require("fs");
const { pipeline } = require("stream");

const streamsGenerator = require("./modules/streamsGenerator");

const params = process.argv.splice(2);

if (params.length < 2) {
  process.stderr.write("Config is missed");
  process.exit(1);
}
console.log(params);
const config = params[1];
const configArgs = config.split("-");

const inputFilename = params[3];
const outputFilename = params[5];

const rs = fs.createReadStream(inputFilename);
const ws = fs.createWriteStream(outputFilename, { flags: "a+" });

const streamsArr = streamsGenerator(configArgs);

pipeline(rs, ...streamsArr, ws, (err) => {
  console.log("Error: ", err);
});
