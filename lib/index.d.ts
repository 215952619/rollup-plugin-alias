import { Plugin } from "rollup";
interface EntryObject {
    [find: string]: string;
}
type EntryArray = {
    find: string;
    replacement: string;
}[];
export interface AliasOption {
    entries?: EntryArray | EntryObject;
}
declare const _default: (options?: AliasOption) => Plugin;
export default _default;
