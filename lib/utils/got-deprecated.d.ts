import type { CancelableRequest, Got, Options, Response as GotResponse } from 'got';
type Response<T> = GotResponse<string> & {
    data: T;
    status: number;
};
type GotRequestFunction = {
    (url: string | URL, options?: Options): CancelableRequest<Response<Record<string, any>>>;
    <T>(url: string | URL, options?: Options): CancelableRequest<Response<T>>;
    (options: Options): CancelableRequest<Response<Record<string, any>>>;
    <T>(options: Options): CancelableRequest<Response<T>>;
};
declare const custom: {
    all?: <T>(list: Array<Promise<T>>) => Promise<Array<T>>;
    get: GotRequestFunction;
    post: GotRequestFunction;
    put: GotRequestFunction;
    patch: GotRequestFunction;
    head: GotRequestFunction;
    delete: GotRequestFunction;
} & GotRequestFunction & Got;
export default custom;
export type { Options, Response } from 'got';
//# sourceMappingURL=got-deprecated.d.ts.map