import rollupPluginAlias from "rollup-plugin-alias";

export default {
  input: "./entry.js",
  output: {
    dir: "lib",
    format: "es",
  },
  plugins: [
    rollupPluginAlias({
      entries: {
        "@mod": "./mod",
      },
    }),
  ],
};
