type DebugInfo = {
    hitCache: number;
    request: number;
    etag: number;
    error: number;
    paths: Record<string, number>;
    routes: Record<string, number>;
    errorPaths: Record<string, number>;
    errorRoutes: Record<string, number>;
};
declare const debug: DebugInfo;
export declare const getDebugInfo: () => DebugInfo;
export declare const setDebugInfo: (info: typeof debug) => DebugInfo;
export {};
//# sourceMappingURL=debug-info.d.ts.map