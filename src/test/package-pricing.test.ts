import { describe, expect, it } from "vitest";
import { PACKAGE_PRICES } from "../components/Pricing";

describe("bundle package prices", () => {
  it("shows Advanced at ₹6,137 against ₹6,874", () => {
    expect(PACKAGE_PRICES.advanced.price).toBe(6137);
    expect(PACKAGE_PRICES.advanced.originalPrice).toBe(6874);
  });

  it("shows Complete Blueprint at ₹8,477 against ₹9,394", () => {
    expect(PACKAGE_PRICES.complete.price).toBe(8477);
    expect(PACKAGE_PRICES.complete.originalPrice).toBe(9394);
  });
});