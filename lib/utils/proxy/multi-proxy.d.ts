import type { Config } from '@/config';
export interface ProxyState {
    uri: string;
    isActive: boolean;
    failureCount: number;
    lastFailureTime?: number;
    agent?: any;
    dispatcher?: any;
    urlHandler?: URL | null;
}
export interface MultiProxyResult {
    currentProxy?: ProxyState | null;
    allProxies: ProxyState[];
    proxyObj: Config['proxy'];
    getNextProxy: () => ProxyState | null;
    markProxyFailed: (proxyUri: string) => void;
    resetProxy: (proxyUri: string) => void;
}
declare const createMultiProxy: (proxyUris: string[], proxyObj: Config["proxy"]) => MultiProxyResult;
export default createMultiProxy;
//# sourceMappingURL=multi-proxy.d.ts.map