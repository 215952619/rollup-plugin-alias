var index = (options) => {
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
            }
            else {
                return source + ".js";
            }
        },
    };
};
const normalizeEntry = (entries) => {
    if (!entries)
        return [];
    if (Array.isArray(entries)) {
        return entries.map(({ find, replacement }) => new AliasEntry(find, replacement));
    }
    else {
        return Object.entries(entries).map(([find, replacement]) => new AliasEntry(find, replacement));
    }
};
class AliasEntry {
    find;
    replacement;
    constructor(find, replacement) {
        this.find = find;
        this.replacement = replacement;
    }
    test(target) {
        return target.startsWith(this.find);
    }
    replace(target) {
        return target.replace(this.find, this.replacement);
    }
}

export { index as default };
