import type { Config } from '@/config';
declare const pacProxy: (pacUri: Config["pacUri"], pacScript: Config["pacScript"], proxyObj: Config["proxy"]) => {
    proxyUri: Config;
    proxyObj: Config;
    proxyUrlHandler: URL | null;
};
export default pacProxy;
//# sourceMappingURL=pac-proxy.d.ts.map