import type { RouteHandler } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
declare const route: {
    method: "get";
    path: "/namespace/{namespace}";
    tags: string[];
    request: {
        params: z.ZodObject<{
            namespace: z.ZodString;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            description: string;
        };
    };
} & {
    getRoutingPath(): "/namespace/:namespace";
};
declare const handler: RouteHandler<typeof route>;
export { handler, route };
//# sourceMappingURL=one.d.ts.map