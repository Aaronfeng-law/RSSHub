import { setConfig } from '@/config';
export * from '@/types';
export { default as ofetch } from '@/utils/ofetch';
export * from '@/utils/parse-date';
let app = null;
function ensureAppInitialized(app) {
    if (!app) {
        throw new Error('RSSHub not initialized. Please call init() first.');
    }
}
export async function init(conf) {
    setConfig(Object.assign({
        IS_PACKAGE: true,
    }, conf));
    app = (await import('@/app')).default;
}
export async function request(path) {
    ensureAppInitialized(app);
    const res = await app.request(path);
    return res.json();
}
export async function registerRoute(namespace, route, namespaceConfig) {
    ensureAppInitialized(app);
    const { namespaces } = await import('./registry');
    if (!namespaces[namespace]) {
        namespaces[namespace] = {
            ...namespaceConfig,
            name: namespaceConfig?.name || namespace,
            routes: {},
            apiRoutes: {},
        };
    }
    const paths = Array.isArray(route.path) ? route.path : [route.path];
    const subApp = app.basePath(`/${namespace}`);
    const wrappedHandler = async (ctx) => {
        if (!ctx.get('data')) {
            const response = await route.handler(ctx);
            if (response instanceof Response) {
                return response;
            }
            ctx.set('data', response);
        }
    };
    for (const path of paths) {
        namespaces[namespace].routes[path] = {
            ...route,
            location: `custom/${namespace}`,
        };
        subApp.get(path, wrappedHandler);
    }
}
//# sourceMappingURL=pkg.js.map