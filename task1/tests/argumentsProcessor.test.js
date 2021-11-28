const argumentsProcessor = require("../modules/argumentsProcessor");

describe("Function argumentsProcessor", () => {
  test("should return object with arguments", () => {
    expect(
      argumentsProcessor([
        "-c",
        "C1-C1-R0-A",
        "-i",
        "./input.txt",
        "-o",
        "./output.txt",
      ])
    ).toEqual({
      config: "C1-C1-R0-A",
      inputFilename: "./input.txt",
      outputFilename: "./output.txt",
    });
  });

  test("with long names for params should return object with arguments ", () => {
    expect(
      argumentsProcessor([
        "--config",
        "C1-C1-R0-A",
        "--input",
        "./input.txt",
        "--output",
        "./output.txt",
      ])
    ).toEqual({
      config: "C1-C1-R0-A",
      inputFilename: "./input.txt",
      outputFilename: "./output.txt",
    });
  });

  test("should exit with process.exit(1) if config argument is duplicated", async () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((number) => {
        throw new Error("process.exit: " + number);
      });
    expect(() => {
      argumentsProcessor([
        "--config",
        "C1-C1-R0-A",
        "--input",
        "./input.txt",
        "--output",
        "./output.txt",
        "-c",
        "C1-C1",
      ]);
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });

  test("should exit with process.exit(1) if input argument is duplicated", async () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((number) => {
        throw new Error("process.exit: " + number);
      });
    expect(() => {
      argumentsProcessor([
        "--config",
        "C1-C1-R0-A",
        "--input",
        "./input.txt",
        "-i",
        "./newinput.txt",
        "--output",
        "./output.txt",
      ]);
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });

  test("should exit with process.exit(1) if output argument is duplicated", async () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((number) => {
        throw new Error("process.exit: " + number);
      });
    expect(() => {
      argumentsProcessor([
        "--config",
        "C1-C1-R0-A",
        "--input",
        "./input.txt",
        "--output",
        "./output.txt",
        "-o",
        "./newoutput.txt",
      ]);
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });

  test("should print error text to process.stderr if output argument is duplicated", async () => {
    const mockExit = jest
      .spyOn(process.stderr, "write")
      .mockImplementation((text) => {
        throw new Error("process.stderr.write: " + text);
      });
    expect(() => {
      argumentsProcessor([
        "--config",
        "C1-C1-R0-A",
        "--input",
        "./input.txt",
        "--output",
        "./output.txt",
        "-o",
        "./newoutput.txt",
      ]);
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(
      "Parameters contains duplicated option for output"
    );
    mockExit.mockRestore();
  });

  test("should print error text to process.stderr if intput argument is duplicated", async () => {
    const mockExit = jest
      .spyOn(process.stderr, "write")
      .mockImplementation((text) => {
        throw new Error("process.stderr.write: " + text);
      });
    expect(() => {
      argumentsProcessor([
        "--config",
        "C1-C1-R0-A",
        "--input",
        "./input.txt",
        "--output",
        "./output.txt",
        "-i",
        "./newinput.txt",
      ]);
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(
      "Parameters contains duplicated option for input"
    );
    mockExit.mockRestore();
  });

  test("should print error text to process.stderr if config argument is duplicated", async () => {
    const mockExit = jest
      .spyOn(process.stderr, "write")
      .mockImplementation((text) => {
        throw new Error("process.stderr.write: " + text);
      });
    expect(() => {
      argumentsProcessor([
        "--config",
        "C1-C1-R0-A",
        "--input",
        "./input.txt",
        "--output",
        "./output.txt",
        "-c",
        "N-E-W-CONFIG",
      ]);
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(
      "Parameters contains duplicated option config"
    );
    mockExit.mockRestore();
  });
});
