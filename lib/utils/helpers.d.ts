export declare const getRouteNameFromPath: (path: string) => string | null | undefined;
export declare const getPath: (request: Request) => string;
export declare const time: (start: number) => string;
export declare const getCurrentPath: (metaUrl: string) => string;
export declare function getSearchParamsString(searchParams: any): string;
/**
 * parse duration string to seconds
 * @param {string} timeStr - duration string like "01:01:01" / "01:01" / "59"
 * @returns {number}       - total seconds
 */
export declare function parseDuration(timeStr: string | undefined | null): number | undefined;
//# sourceMappingURL=helpers.d.ts.map