import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "./index.ts",
  output: {
    dir: "lib",
    format: "es",
  },
  plugins: [
    typescript({
      declaration: true,
      outDir: "lib",
    }),
  ],
});
