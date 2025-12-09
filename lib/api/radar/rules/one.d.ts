import type { RouteHandler } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
declare const route: {
    method: "get";
    path: "/radar/rules/{domain}";
    tags: string[];
    request: {
        params: z.ZodObject<{
            domain: z.ZodString;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            description: string;
        };
    };
} & {
    getRoutingPath(): "/radar/rules/:domain";
};
declare const handler: RouteHandler<typeof route>;
export { handler, route };
//# sourceMappingURL=one.d.ts.map