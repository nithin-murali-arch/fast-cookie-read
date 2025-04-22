
const FastCookieRead = require("../index.js");
describe("FastCookieRead", () => {
  let dom;
  let cookieReader;
  beforeAll(() => {
    global.document = {cookie: 'name=nithin;age=55;country=IN;'};
    cookieReader = new FastCookieRead();
  });

  it("should be defined", () => {
    expect(FastCookieRead).toBeDefined();
  });

  it("should get a cookie after setting it", () => {
    document.cookie = "testCookie=testValue";
    const cookieReader = new FastCookieRead();
    expect(cookieReader.get("testCookie")).toBe("testValue");
  });

  it("should return null for a non-existent cookie", () => {
    const cookieReader = new FastCookieRead();
    expect(cookieReader.get("nonExistentCookie")).toBeNull();
  });

  it("should get all cookies", () => {
    document.cookie = "cookie1=value1; cookie2=value2; cookie3=value3";
    const cookieReader = new FastCookieRead();
    const allCookies = cookieReader.getAll();
    expect(allCookies).toEqual({
      cookie1: "value1",
      cookie2: "value2",
      cookie3: "value3",
    });
  });

  it("should handle empty cookie string", () => {
    document.cookie = "";
    const cookieReader = new FastCookieRead();
    const allCookies = cookieReader.getAll();
    expect(allCookies).toEqual({});
  });

  it("should get a cookie value with extra spaces", () => {
    document.cookie = "  cookieName  =  cookieValue  ";
    const cookieReader = new FastCookieRead();
    expect(cookieReader.get("cookieName")).toBe("cookieValue");
  });

  it("should get a cookie using getInefficient", () => {
    document.cookie = "anotherCookie=anotherValue;";
    const cookieReader = new FastCookieRead();
    expect(cookieReader.getInefficient("anotherCookie")).toBe("anotherValue");
  }); 

  it("should update cache when document.cookie changes", () => {
    document.cookie = "initialCookie=initialValue";
    const cookieReader = new FastCookieRead();
    expect(cookieReader.get("initialCookie")).toBe("initialValue");

    document.cookie = "initialCookie=newValue"; // Simulate cookie change
    expect(cookieReader.get("initialCookie")).toBe("newValue"); // Should reflect the change
  });
});
