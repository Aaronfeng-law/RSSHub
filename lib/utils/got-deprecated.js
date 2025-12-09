import got from 'got';
import { config } from '@/config';
import logger from '@/utils/logger';
// @ts-expect-error got instance with custom response type
const custom = got.extend({
    retry: {
        limit: config.requestRetry,
        statusCodes: [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 421, 422, 423, 424, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511, 521, 522, 524],
    },
    hooks: {
        beforeRetry: [
            (err, count) => {
                logger.error(`Request ${err.options.url} fail, retry attempt #${count}: ${err}`);
            },
        ],
        beforeRedirect: [
            (options, response) => {
                logger.http(`Redirecting to ${options.url} for ${response.requestUrl}`);
            },
        ],
        afterResponse: [
            // @ts-expect-error custom response type
            (response) => {
                try {
                    response.data = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
                }
                catch {
                    // @ts-expect-error for compatibility
                    response.data = response.body;
                }
                response.status = response.statusCode;
                return response;
            },
        ],
        init: [
            (options) => {
                // compatible with axios api
                if (options && options.data) {
                    options.body = options.body || options.data;
                }
            },
        ],
    },
    headers: {
        'user-agent': config.ua,
    },
    timeout: {
        request: config.requestTimeout,
    },
});
custom.all = (list) => Promise.all(list);
export default custom;
//# sourceMappingURL=got-deprecated.js.map