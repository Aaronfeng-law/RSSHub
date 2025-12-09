/**
 * @param {object} [opts]
 * @param {string} [opts.outputDir='templates']  Sub‑folder inside your Rollup output where the
 *                                               cloned templates will live (e.g. dist/templates)
 */
export default function artTemplatesPlugin(opts?: {}): {
    name: string;
    /**
     * Scan every JS/TS file for `path.join(...'.art'...)`
     * and rewrite it on the fly.
     */
    transform(code: any, id: any): {
        code: string;
        map: import("magic-string").SourceMap;
    } | null;
};
//# sourceMappingURL=rollup-plugin-art-templates.d.ts.map