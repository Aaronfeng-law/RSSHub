import type { RouteHandler } from '@hono/zod-openapi';
declare const route: {
    method: "get";
    path: "/namespace";
    tags: string[];
    responses: {
        200: {
            description: string;
        };
    };
} & {
    getRoutingPath(): "/namespace";
};
declare const handler: RouteHandler<typeof route>;
export { handler, route };
//# sourceMappingURL=all.d.ts.map