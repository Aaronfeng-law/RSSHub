import { HttpsProxyAgent } from 'https-proxy-agent';
import { PacProxyAgent } from 'pac-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { ProxyAgent } from 'undici';
import type { MultiProxyResult, ProxyState } from './multi-proxy';
interface ProxyExport {
    agent: PacProxyAgent<string> | HttpsProxyAgent<string> | SocksProxyAgent | null;
    dispatcher: ProxyAgent | null;
    proxyUri?: string;
    proxyObj: Record<string, any>;
    proxyUrlHandler?: URL | null;
    multiProxy?: MultiProxyResult;
    getCurrentProxy: () => ProxyState | null;
    markProxyFailed: (proxyUri: string) => void;
    getAgentForProxy: (proxyState: ProxyState) => any;
    getDispatcherForProxy: (proxyState: ProxyState) => ProxyAgent | null;
}
declare const proxyExport: ProxyExport;
export default proxyExport;
//# sourceMappingURL=index.d.ts.map