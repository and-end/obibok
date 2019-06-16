global.console.log = jest.fn();

describe("server", () => {
  it('loggs "Hello server"', () => {
    require("./index");
    expect(global.console.log).toHaveBeenCalledWith("Hello server");
  });
});
