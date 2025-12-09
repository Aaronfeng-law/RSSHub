import type { HeaderGeneratorOptions } from 'header-generator';
export { PRESETS } from 'header-generator';
export declare const generateHeaders: (preset?: Partial<HeaderGeneratorOptions>) => import("header-generator").Headers;
/** List of headers to include from header-generator output
 * excluding headers that are typically set manually or by the environment
 */
export declare const generatedHeaders: Set<string>;
//# sourceMappingURL=header-generator.d.ts.map