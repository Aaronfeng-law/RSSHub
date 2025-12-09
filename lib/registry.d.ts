import { Hono } from 'hono';
import type { APIRoute, Namespace, Route } from '@/types';
type RoutesType = Record<string, Route & {
    location: string;
}>;
export type NamespacesType = Record<string, Namespace & {
    routes: RoutesType;
    apiRoutes: Record<string, APIRoute & {
        location: string;
    }>;
}>;
declare let namespaces: NamespacesType;
export { namespaces };
declare const app: Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
export default app;
//# sourceMappingURL=registry.d.ts.map