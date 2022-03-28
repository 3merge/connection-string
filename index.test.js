const assertConnectionValue = (v) => {
  expect(process.env.CONNECTION).toEqual(v);
};

beforeEach(() => {
  jest.resetModules();
  delete process.env.CONNECTION;
  delete process.env.MONGO;
  delete process.env.QUOTAGUARDSTATIC_URL;
  delete process.env.QUOTAGUARDSTATIC_URL_PORT;
});

describe("connection-string-q3", () => {
  it("should error without vars", () => {
    expect(() => require("./index")).toThrowError();
    assertConnectionValue();
  });

  it("should keep connection", () => {
    process.env.CONNECTION = "FOO";
    expect(() => require("./index")).not.toThrowError();
    assertConnectionValue("FOO");
  });

  it("should build connection", () => {
    process.env.MONGO = "mongo://vendor.com/test";
    process.env.QUOTAGUARDSTATIC_URL = "https://username:auth@vendor.com/1234";

    require("./index");
    assertConnectionValue(
      "mongo://vendor.com/test?retryWrites=true&w=majority&readPreference=nearest&ssl=true&tls=true&proxyHost=vendor.com&proxyPassword=auth&proxyPort=1080&proxyUsername=username"
    );
  });

  it("should build connection with custom port", () => {
    process.env.MONGO = "mongo://vendor.com/test";
    process.env.QUOTAGUARDSTATIC_URL = "https://username:auth@vendor.com/1234";
    process.env.QUOTAGUARDSTATIC_URL_PORT = 1234;

    require("./index");
    assertConnectionValue(
      "mongo://vendor.com/test?retryWrites=true&w=majority&readPreference=nearest&ssl=true&tls=true&proxyHost=vendor.com&proxyPassword=auth&proxyPort=1234&proxyUsername=username"
    );
  });
});
