import { Plugin } from "rollup";

interface EntryObject {
  [find: string]: string;
}

type EntryArray = { find: string; replacement: string }[];

export interface AliasOption {
  entries?: EntryArray | EntryObject;
}

export default (options?: AliasOption): Plugin => {
  const entries = normalizeEntry(options?.entries);

  return {
    name: "rollup-plugin-alias",
    resolveId(source, importer) {
      let entry = entries.find((item) => item.test(source));

      if (entry) {
        source = entry?.replace(source);
      }

      if (source.endsWith(".js")) {
        return source;
      } else {
        return source + ".js";
      }
    },
  };
};

const normalizeEntry = (entries: AliasOption["entries"]): AliasEntry[] => {
  if (!entries) return [];
  if (Array.isArray(entries)) {
    return entries.map(
      ({ find, replacement }) => new AliasEntry(find, replacement)
    );
  } else {
    return Object.entries(entries).map(
      ([find, replacement]) => new AliasEntry(find, replacement)
    );
  }
};

class AliasEntry {
  find: string;
  replacement: string;
  constructor(find: string, replacement: string) {
    this.find = find;
    this.replacement = replacement;
  }
  test(target: string) {
    return target.startsWith(this.find);
  }
  replace(target: string) {
    return target.replace(this.find, this.replacement);
  }
}
