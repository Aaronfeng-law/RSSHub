import type { HeaderGeneratorOptions } from 'header-generator';
declare module 'ofetch' {
    interface FetchOptions {
        headerGeneratorOptions?: Partial<HeaderGeneratorOptions>;
    }
}
declare const rofetch: import("ofetch").$Fetch;
export default rofetch;
//# sourceMappingURL=ofetch.d.ts.map