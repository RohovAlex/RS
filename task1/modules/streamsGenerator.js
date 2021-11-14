const { Transform } = require("stream");

const shiftLetters = require("./shiftLetters");
const atbashShiftLetters = require("./atbashShiftLetters");

class TransformStreamsCreator {
  static transformAtbash() {
    return new Transform({
      transform(chank, enc, cb) {
        cb(null, atbashShiftLetters(chank) + "\n");
      },
    });
  }

  static transformCaesarEncoding() {
    return new Transform({
      transform(chank, enc, cb) {
        cb(null, shiftLetters(chank, 1) + "\n");
      },
    });
  }

  static transformCaesarDecoding() {
    return new Transform({
      transform(chank, enc, cb) {
        cb(null, shiftLetters(chank, -1) + "\n");
      },
    });
  }

  static transformROT8Encoding() {
    return new Transform({
      transform(chank, enc, cb) {
        cb(null, shiftLetters(chank, 8) + "\n");
      },
    });
  }

  static transformROT8Decoding() {
    return new Transform({
      transform(chank, enc, cb) {
        cb(null, shiftLetters(chank, -8) + "\n");
      },
    });
  }
}

const streamsGenerator = (argsArray) => {
  const streams = argsArray.map((arg) => {
    switch (arg) {
      case "C1":
        return TransformStreamsCreator.transformCaesarEncoding();
        break;
      case "C0":
        return TransformStreamsCreator.transformCaesarDecoding();
        break;
      case "R1":
        return TransformStreamsCreator.transformROT8Encoding();
        break;
      case "R0":
        return TransformStreamsCreator.transformROT8Decoding();
        break;
      case "A":
        return TransformStreamsCreator.transformAtbash();
        break;

      default:
        break;
    }
  });
  return streams;
};

module.exports = streamsGenerator;
