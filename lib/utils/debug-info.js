const debug = {
    hitCache: 0,
    request: 0,
    etag: 0,
    error: 0,
    routes: {},
    paths: {},
    errorRoutes: {},
    errorPaths: {},
};
export const getDebugInfo = () => debug;
export const setDebugInfo = (info) => Object.assign(debug, info);
//# sourceMappingURL=debug-info.js.map