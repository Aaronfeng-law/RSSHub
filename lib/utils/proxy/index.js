import { HttpsProxyAgent } from 'https-proxy-agent';
import { PacProxyAgent } from 'pac-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { ProxyAgent } from 'undici';
import { config } from '@/config';
import logger from '@/utils/logger';
import createMultiProxy from './multi-proxy';
import pacProxy from './pac-proxy';
import unifyProxy from './unify-proxy';
const proxyIsPAC = config.pacUri || config.pacScript;
let proxyUri;
let proxyObj = {};
let proxyUrlHandler = null;
let multiProxy;
const createAgentForProxy = (uri, proxyObj) => {
    if (uri.startsWith('http')) {
        return new HttpsProxyAgent(uri, {
            headers: {
                'proxy-authorization': proxyObj?.auth ? `Basic ${proxyObj.auth}` : undefined,
            },
        });
    }
    else if (uri.startsWith('socks')) {
        return new SocksProxyAgent(uri);
    }
    return null;
};
const createDispatcherForProxy = (uri, proxyObj) => {
    if (uri.startsWith('http')) {
        return new ProxyAgent({
            uri,
            token: proxyObj?.auth ? `Basic ${proxyObj.auth}` : undefined,
            requestTls: {
                rejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0',
            },
        });
    }
    return null;
};
if (proxyIsPAC) {
    const proxy = pacProxy(config.pacUri, config.pacScript, config.proxy);
    proxyUri = proxy.proxyUri;
    proxyObj = proxy.proxyObj;
    proxyUrlHandler = proxy.proxyUrlHandler;
}
else if (config.proxyUris && config.proxyUris.length > 0) {
    multiProxy = createMultiProxy(config.proxyUris, config.proxy);
    proxyObj = multiProxy.proxyObj;
    const currentProxy = multiProxy.getNextProxy();
    if (currentProxy) {
        proxyUri = currentProxy.uri;
        proxyUrlHandler = currentProxy.urlHandler;
    }
    logger.info(`Multi-proxy initialized with ${config.proxyUris.length} proxies`);
}
else {
    const proxy = unifyProxy(config.proxyUri, config.proxy);
    proxyUri = proxy.proxyUri;
    proxyObj = proxy.proxyObj;
    proxyUrlHandler = proxy.proxyUrlHandler;
}
let agent = null;
let dispatcher = null;
if (proxyIsPAC && proxyUri) {
    agent = new PacProxyAgent(`pac+${proxyUri}`);
}
else if (proxyUri) {
    agent = createAgentForProxy(proxyUri, proxyObj);
    dispatcher = createDispatcherForProxy(proxyUri, proxyObj);
}
const getCurrentProxy = () => {
    if (multiProxy) {
        return multiProxy.getNextProxy();
    }
    if (proxyUri) {
        return {
            uri: proxyUri,
            isActive: true,
            failureCount: 0,
            urlHandler: proxyUrlHandler,
        };
    }
    return null;
};
const markProxyFailed = (failedProxyUri) => {
    if (multiProxy) {
        multiProxy.markProxyFailed(failedProxyUri);
        const nextProxy = multiProxy.getNextProxy();
        if (nextProxy) {
            proxyUri = nextProxy.uri;
            proxyUrlHandler = nextProxy.urlHandler || null;
            agent = createAgentForProxy(nextProxy.uri, proxyObj);
            dispatcher = createDispatcherForProxy(nextProxy.uri, proxyObj);
            logger.info(`Switched to proxy: ${nextProxy.uri}`);
        }
        else {
            logger.warn('No available proxies remaining');
            agent = null;
            dispatcher = null;
            proxyUri = undefined;
        }
    }
};
const getAgentForProxy = (proxyState) => createAgentForProxy(proxyState.uri, proxyObj);
const getDispatcherForProxy = (proxyState) => createDispatcherForProxy(proxyState.uri, proxyObj);
const proxyExport = {
    agent,
    dispatcher,
    proxyUri,
    proxyObj,
    proxyUrlHandler,
    multiProxy,
    getCurrentProxy,
    markProxyFailed,
    getAgentForProxy,
    getDispatcherForProxy,
};
export default proxyExport;
//# sourceMappingURL=index.js.map