import type { RoutePath } from '@/../assets/build/route-paths';
import type { ConfigEnv } from '@/config';
import type { Namespace, Route } from './types';
export * from '@/types';
export { default as ofetch } from '@/utils/ofetch';
export * from '@/utils/parse-date';
export declare function init(conf?: ConfigEnv): Promise<void>;
export declare function request(path: RoutePath | (string & {})): Promise<Data>;
export declare function registerRoute(namespace: string, route: Route, namespaceConfig?: Namespace): Promise<void>;
//# sourceMappingURL=pkg.d.ts.map