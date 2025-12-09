import type { Config } from '@/config';
declare const unifyProxy: (proxyUri: Config["proxyUri"] | string, proxyObj: Config["proxy"]) => {
    proxyUri: any;
    proxyObj: Config;
    proxyUrlHandler: URL | null;
};
export declare const unifyProxies: (proxyUris: string[], proxyObj: Config["proxy"]) => {
    proxyUri: any;
    proxyObj: Config;
    proxyUrlHandler: URL | null;
}[];
export default unifyProxy;
//# sourceMappingURL=unify-proxy.d.ts.map