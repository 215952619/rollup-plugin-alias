import { describe, it, expect } from "vitest";
import alias from "../index";

describe("测试index", () => {
  it("测试正常路径", () => {
    const plugin = alias();
    expect(plugin.resolveId("./index.js")).toBe("./index.js");
  });

  it("测试能否补全路径", () => {
    const plugin = alias();
    expect(plugin.resolveId("./index")).toBe("./index.js");
  });

  describe("测试entries为对象的情况", () => {
    it("测试命中规则", () => {
      const plugin = alias({ entries: { "@": "src" } });
      expect(plugin.resolveId("@/index.js")).toBe("src/index.js");
    });

    it("测试命中规则且补全路径", () => {
      const plugin = alias({ entries: { "@": "src" } });
      expect(plugin.resolveId("@/index")).toBe("src/index.js");
    });
  });

  describe("测试entries为数组的情况", () => {
    it("测试命中规则", () => {
      const plugin = alias({ entries: [{ find: "@", replacement: "src" }] });
      expect(plugin.resolveId("@/index.js")).toBe("src/index.js");
    });

    it("测试命中规则且补全路径", () => {
      const plugin = alias({ entries: [{ find: "@", replacement: "src" }] });
      expect(plugin.resolveId("@/index")).toBe("src/index.js");
    });
  });
});
