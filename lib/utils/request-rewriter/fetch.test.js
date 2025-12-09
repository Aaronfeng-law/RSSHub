import { getCurrentCell, setCurrentCell } from 'node-network-devtools';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useCustomHeader } from './fetch';
const getInitRequest = () => ({
    requestHeaders: {},
    id: '',
    loadCallFrames: () => { },
    cookies: '',
    requestData: '',
    responseData: '',
    responseHeaders: {},
    responseInfo: {},
});
var Env;
(function (Env) {
    Env["dev"] = "dev";
    Env["production"] = "production";
    Env["test"] = "test";
})(Env || (Env = {}));
describe('useCustomHeader', () => {
    let originalEnv;
    beforeEach(() => {
        originalEnv = process.env.NODE_ENV || Env.test;
        process.env.ENABLE_REMOTE_DEBUGGING = 'true';
    });
    afterEach(() => {
        process.env.NODE_ENV = originalEnv;
    });
    test('should register request with custom headers in dev environment', () => {
        process.env.NODE_ENV = Env.dev;
        const headers = new Headers();
        const headerText = 'authorization';
        const headerValue = 'Bearer token';
        headers.set(headerText, headerValue);
        const req = getInitRequest();
        setCurrentCell({
            request: req,
            pipes: [],
            isAborted: false,
        });
        useCustomHeader(headers);
        const cell = getCurrentCell();
        expect(cell).toBeDefined();
        let request = req;
        if (cell) {
            for (const { pipe } of cell.pipes) {
                request = pipe(request);
            }
        }
        expect(request.requestHeaders[headerText]).toEqual(headerValue);
    });
    test('should not register request in non-dev environment', () => {
        process.env.NODE_ENV = Env.production;
        const headers = new Headers();
        const headerText = 'content-type';
        const headerValue = 'application/json';
        headers.set(headerText, headerValue);
        const req = getInitRequest();
        setCurrentCell({
            request: req,
            pipes: [],
            isAborted: false,
        });
        useCustomHeader(headers);
        const cell = getCurrentCell();
        expect(cell).toBeDefined();
        let request = req;
        if (cell) {
            for (const { pipe } of cell.pipes) {
                request = pipe(request);
            }
        }
        expect(req.requestHeaders[headerText]).toBeUndefined();
    });
});
//# sourceMappingURL=fetch.test.js.map