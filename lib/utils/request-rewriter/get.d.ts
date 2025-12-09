import type http from 'node:http';
import type https from 'node:https';
type Get = typeof http.get | typeof https.get | typeof http.request | typeof https.request;
declare const getWrappedGet: <T extends Get>(origin: T) => T;
export default getWrappedGet;
//# sourceMappingURL=get.d.ts.map