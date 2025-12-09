import type { RouteHandler } from '@hono/zod-openapi';
declare const route: {
    method: "get";
    path: "/radar/rules";
    tags: string[];
    responses: {
        200: {
            description: string;
        };
    };
} & {
    getRoutingPath(): "/radar/rules";
};
declare const handler: RouteHandler<typeof route>;
export { handler, route };
//# sourceMappingURL=all.d.ts.map