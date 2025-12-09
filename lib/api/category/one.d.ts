import type { RouteHandler } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
declare const route: {
    method: "get";
    path: "/category/{category}";
    tags: string[];
    request: {
        query: z.ZodObject<{
            categories: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>>;
            lang: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        params: z.ZodObject<{
            category: z.ZodString;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            description: string;
        };
    };
} & {
    getRoutingPath(): "/category/:category";
};
declare const handler: RouteHandler<typeof route>;
export { handler, route };
//# sourceMappingURL=one.d.ts.map