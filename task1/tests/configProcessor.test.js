const configProcessor = require("../modules/configProcessor");

describe("Function configProcessor", () => {
  test("should return array of arguments", () => {
    expect(configProcessor("C1-C1-R0-A")).toEqual(["C1", "C1", "R0", "A"]);
  });

  test("should exit with process.exit(1) if config is wrong", async () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((number) => {
        throw new Error("process.exit: " + number);
      });
    expect(() => {
      configProcessor("Wrong config");
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });

  test("should exit with process.exit(1) if config is empty", async () => {
    const mockExit = jest
      .spyOn(process, "exit")
      .mockImplementation((number) => {
        throw new Error("process.exit: " + number);
      });
    expect(() => {
      configProcessor("");
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(1);
    mockExit.mockRestore();
  });
});
