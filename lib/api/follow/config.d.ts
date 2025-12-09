import type { RouteHandler } from '@hono/zod-openapi';
declare const route: {
    method: "get";
    path: "/follow/config";
    tags: string[];
    responses: {
        200: {
            description: string;
        };
    };
} & {
    getRoutingPath(): "/follow/config";
};
declare const handler: RouteHandler<typeof route>;
export { handler, route };
//# sourceMappingURL=config.d.ts.map