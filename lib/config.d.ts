import 'dotenv/config';
type ConfigEnvKeys = 'DISALLOW_ROBOT' | 'ENABLE_CLUSTER' | 'IS_PACKAGE' | 'NODE_NAME' | 'PUPPETEER_REAL_BROWSER_SERVICE' | 'PUPPETEER_WS_ENDPOINT' | 'CHROMIUM_EXECUTABLE_PATH' | 'PORT' | 'LISTEN_INADDR_ANY' | 'REQUEST_RETRY' | 'REQUEST_TIMEOUT' | 'UA' | 'NO_RANDOM_UA' | 'ALLOW_ORIGIN' | 'CACHE_TYPE' | 'CACHE_REQUEST_TIMEOUT' | 'CACHE_EXPIRE' | 'CACHE_CONTENT_EXPIRE' | 'MEMORY_MAX' | 'REDIS_URL' | 'PROXY_URI' | 'PROXY_URIS' | 'PROXY_PROTOCOL' | 'PROXY_HOST' | 'PROXY_PORT' | 'PROXY_AUTH' | 'PROXY_URL_REGEX' | 'PROXY_STRATEGY' | 'PROXY_FAILOVER_TIMEOUT' | 'PROXY_HEALTH_CHECK_INTERVAL' | 'PAC_URI' | 'PAC_SCRIPT' | 'ACCESS_KEY' | 'DEBUG_INFO' | 'LOGGER_LEVEL' | 'NO_LOGFILES' | 'OTEL_SECONDS_BUCKET' | 'OTEL_MILLISECONDS_BUCKET' | 'SHOW_LOGGER_TIMESTAMP' | 'SENTRY' | 'SENTRY_ROUTE_TIMEOUT' | 'ENABLE_REMOTE_DEBUGGING' | 'HOTLINK_TEMPLATE' | 'HOTLINK_INCLUDE_PATHS' | 'HOTLINK_EXCLUDE_PATHS' | 'ALLOW_USER_HOTLINK_TEMPLATE' | 'FILTER_REGEX_ENGINE' | 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' | 'DISABLE_NSFW' | 'SUFFIX' | 'TITLE_LENGTH_LIMIT' | 'OPENAI_API_KEY' | 'OPENAI_MODEL' | 'OPENAI_TEMPERATURE' | 'OPENAI_MAX_TOKENS' | 'OPENAI_API_ENDPOINT' | 'OPENAI_INPUT_OPTION' | 'OPENAI_PROMPT' | 'OPENAI_PROMPT_TITLE' | 'FOLLOW_OWNER_USER_ID' | 'FOLLOW_DESCRIPTION' | 'FOLLOW_PRICE' | 'FOLLOW_USER_LIMIT' | `BILIBILI_COOKIE_${string}` | 'BILIBILI_DM_IMG_LIST' | 'BILIBILI_DM_IMG_INTER' | 'BILIBILI_EXCLUDE_SUBTITLES' | 'BITBUCKET_USERNAME' | 'BITBUCKET_PASSWORD' | 'BTBYR_HOST' | 'BTBYR_COOKIE' | 'BUPT_PORTAL_COOKIE' | 'CAIXIN_COOKIE' | 'CIVITAI_COOKIE' | 'DIANPING_COOKIE' | 'DIDA365_USERNAME' | 'DIDA365_PASSWORD' | 'DISCORD_AUTHORIZATION' | `DISCOURSE_CONFIG_${string}` | `DISCUZ_COOKIE_${string}` | 'DISQUS_API_KEY' | 'DOUBAN_COOKIE' | 'EH_IPB_MEMBER_ID' | 'EH_IPB_PASS_HASH' | 'EH_SK' | 'EH_IGNEOUS' | 'EH_STAR' | 'EH_IMG_PROXY' | `EMAIL_CONFIG_${string}` | 'FANBOX_SESSION_ID' | 'FANFOU_CONSUMER_KEY' | 'FANFOU_CONSUMER_SECRET' | 'FANFOU_USERNAME' | 'FANFOU_PASSWORD' | 'FANTIA_COOKIE' | 'GAME_4399' | 'GELBOORU_API_KEY' | 'GELBOORU_USER_ID' | 'GITHUB_ACCESS_TOKEN' | 'GITEE_ACCESS_TOKEN' | 'GOOGLE_FONTS_API_KEY' | 'GUOZAOKE_COOKIES' | 'HEFENG_KEY' | 'HEFENG_API_HOST' | 'INFZM_COOKIE' | 'INITIUM_USERNAME' | 'INITIUM_PASSWORD' | 'INITIUM_BEARER_TOKEN' | 'IG_USERNAME' | 'IG_PASSWORD' | 'IG_PROXY' | 'IG_COOKIE' | 'IWARA_USERNAME' | 'IWARA_PASSWORD' | 'JAVDB_SESSION' | 'JUMEILI_COOKIE' | 'KEYLOL_COOKIE' | 'LASTFM_API_KEY' | 'SECURITY_KEY' | 'LOFTER_COOKIE' | 'LORIENTLEJOUR_TOKEN' | 'LORIENTLEJOUR_USERNAME' | 'LORIENTLEJOUR_PASSWORD' | 'MALAYSIAKINI_EMAIL' | 'MALAYSIAKINI_PASSWORD' | 'MALAYSIAKINI_REFRESHTOKEN' | 'MANGADEX_USERNAME' | 'MANGADEX_PASSWORD' | 'MANGADEX_CLIENT_ID' | 'MANGADEX_CLIENT_SECRET' | 'MANGADEX_REFRESH_TOKEN' | 'MHGUI_COOKIE' | 'MASTODON_API_HOST' | 'MASTODON_API_ACCESS_TOKEN' | 'MASTODON_API_ACCT_DOMAIN' | `MEDIUM_COOKIE_${string}` | 'MEDIUM_ARTICLE_COOKIE' | 'MIHOYO_COOKIE' | 'MINIFLUX_INSTANCE' | 'MINIFLUX_TOKEN' | 'MISSKEY_ACCESS_TOKEN' | 'MIXI2_AUTH_TOKEN' | 'MIXI2_AUTH_KEY' | 'MOX_COOKIE' | 'NCM_COOKIES' | 'NEWRANK_COOKIE' | 'NGA_PASSPORT_UID' | 'NGA_PASSPORT_CID' | 'NHENTAI_USERNAME' | 'NHENTAI_PASSWORD' | 'NOTION_TOKEN' | 'PATREON_SESSION_ID' | 'PIANYUAN_COOKIE' | 'PIXABAY_KEY' | 'PIXIV_REFRESHTOKEN' | 'PIXIV_BYPASS_CDN' | 'PIXIV_BYPASS_HOSTNAME' | 'PIXIV_BYPASS_DOH' | 'PIXIV_IMG_PROXY' | 'PKUBBS_COOKIE' | 'QINGTING_ID' | 'READWISE_ACCESS_TOKEN' | 'SARABA1ST_COOKIE' | 'SARABA1ST_HOST' | 'SEHUATANG_COOKIE' | 'SCBOY_BBS_TOKEN' | 'SCIHUB_HOST' | 'SDO_FF14RISINGSTONES' | 'SDO_UA' | 'SIS001_BASE_URL' | 'SKEB_BEARER_TOKEN' | 'SORRYCC_COOKIES' | 'SPOTIFY_CLIENT_ID' | 'SPOTIFY_CLIENT_SECRET' | 'SPOTIFY_REFRESHTOKEN' | 'SSPAI_BEARERTOKEN' | 'TELEGRAM_TOKEN' | 'TELEGRAM_SESSION' | 'TELEGRAM_API_ID' | 'TELEGRAM_API_HASH' | 'TELEGRAM_MAX_CONCURRENT_DOWNLOADS' | 'TELEGRAM_PROXY_HOST' | 'TELEGRAM_PROXY_PORT' | 'TELEGRAM_PROXY_SECRET' | 'TOPHUB_COOKIE' | 'TSDM39_COOKIES' | 'TUMBLR_CLIENT_ID' | 'TUMBLR_CLIENT_SECRET' | 'TUMBLR_REFRESH_TOKEN' | 'TWITTER_USERNAME' | 'TWITTER_PASSWORD' | 'TWITTER_AUTHENTICATION_SECRET' | 'TWITTER_PHONE_OR_EMAIL' | 'TWITTER_AUTH_TOKEN' | 'TWITTER_THIRD_PARTY_API' | 'UESTC_BBS_COOKIE' | 'UESTC_BBS_AUTH_STR' | 'WEIBO_APP_KEY' | 'WEIBO_APP_SECRET' | 'WEIBO_COOKIES' | 'WEIBO_REDIRECT_URL' | 'WENKU8_COOKIE' | 'WORDPRESS_CDN' | 'XIAOYUZHOU_ID' | 'XIAOYUZHOU_TOKEN' | 'XIAOHONGSHU_COOKIE' | 'XIMALAYA_TOKEN' | 'XSIJISHE_COOKIE' | 'XSIJISHE_USER_AGENT' | 'XUEQIU_COOKIES' | 'YAMIBO_SALT' | 'YAMIBO_AUTH' | 'YOUTUBE_KEY' | 'YOUTUBE_CLIENT_ID' | 'YOUTUBE_CLIENT_SECRET' | 'YOUTUBE_REFRESH_TOKEN' | 'ZHIHU_COOKIES' | 'ZODGAME_COOKIE' | 'ZSXQ_ACCESS_TOKEN' | 'SMZDM_COOKIE' | 'REMOTE_CONFIG' | 'REMOTE_CONFIG_AUTH';
export type ConfigEnv = Partial<Record<ConfigEnvKeys, string | undefined>>;
export type Config = {
    disallowRobot: boolean;
    enableCluster?: string;
    isPackage: boolean;
    nodeName?: string;
    puppeteerRealBrowserService?: string;
    puppeteerWSEndpoint?: string;
    chromiumExecutablePath?: string;
    connect: {
        port: number;
    };
    listenInaddrAny: boolean;
    requestRetry: number;
    requestTimeout: number;
    ua: string;
    trueUA: string;
    allowOrigin?: string;
    cache: {
        type: string;
        requestTimeout: number;
        routeExpire: number;
        contentExpire: number;
    };
    memory: {
        max: number;
    };
    redis: {
        url: string;
    };
    proxyUri?: string;
    proxyUris?: string[];
    proxy: {
        protocol?: string;
        host?: string;
        port?: string;
        auth?: string;
        url_regex: string;
        strategy: 'on_retry' | 'all';
        failoverTimeout?: number;
        healthCheckInterval?: number;
    };
    pacUri?: string;
    pacScript?: string;
    accessKey?: string;
    debugInfo: string;
    loggerLevel: string;
    noLogfiles?: boolean;
    otel: {
        seconds_bucket?: string;
        milliseconds_bucket?: string;
    };
    showLoggerTimestamp?: boolean;
    sentry: {
        dsn?: string;
        routeTimeout: number;
    };
    enableRemoteDebugging?: boolean;
    hotlink: {
        template?: string;
        includePaths?: string[];
        excludePaths?: string[];
    };
    feature: {
        allow_user_hotlink_template: boolean;
        filter_regex_engine: string;
        allow_user_supply_unsafe_domain: boolean;
        disable_nsfw: boolean;
    };
    suffix?: string;
    titleLengthLimit: number;
    openai: {
        apiKey?: string;
        model?: string;
        temperature?: number;
        maxTokens?: number;
        endpoint: string;
        inputOption: string;
        promptTitle: string;
        promptDescription: string;
    };
    follow: {
        ownerUserId?: string;
        description?: string;
        price?: number;
        userLimit?: number;
    };
    bilibili: {
        cookies: Record<string, string | undefined>;
        dmImgList?: string;
        dmImgInter?: string;
        excludeSubtitles?: boolean;
    };
    bitbucket: {
        username?: string;
        password?: string;
    };
    btbyr: {
        host?: string;
        cookies?: string;
    };
    bupt: {
        portal_cookie?: string;
    };
    caixin: {
        cookie?: string;
    };
    civitai: {
        cookie?: string;
    };
    dianping: {
        cookie?: string;
    };
    dida365: {
        username?: string;
        password?: string;
    };
    discord: {
        authorization?: string;
    };
    discourse: {
        config: Record<string, string | undefined>;
    };
    discuz: {
        cookies: Record<string, string | undefined>;
    };
    disqus: {
        api_key?: string;
    };
    douban: {
        cookie?: string;
    };
    ehentai: {
        ipb_member_id?: string;
        ipb_pass_hash?: string;
        sk?: string;
        igneous?: string;
        star?: string;
        img_proxy?: string;
    };
    email: {
        config: Record<string, string | undefined>;
    };
    fanbox: {
        session?: string;
    };
    fanfou: {
        consumer_key?: string;
        consumer_secret?: string;
        username?: string;
        password?: string;
    };
    fantia: {
        cookies?: string;
    };
    game4399: {
        cookie?: string;
    };
    gelbooru: {
        apiKey?: string;
        userId?: string;
    };
    github: {
        access_token?: string;
    };
    gitee: {
        access_token?: string;
    };
    google: {
        fontsApiKey?: string;
    };
    guozaoke: {
        cookies?: string;
    };
    hefeng: {
        key?: string;
        apiHost?: string;
    };
    infzm: {
        cookie?: string;
    };
    initium: {
        username?: string;
        password?: string;
        bearertoken?: string;
    };
    instagram: {
        username?: string;
        password?: string;
        proxy?: string;
        cookie?: string;
    };
    iwara: {
        username?: string;
        password?: string;
    };
    javdb: {
        session?: string;
    };
    jumeili: {
        cookie?: string;
    };
    keylol: {
        cookie?: string;
    };
    lastfm: {
        api_key?: string;
    };
    lightnovel: {
        cookie?: string;
    };
    lofter: {
        cookies?: string;
    };
    lorientlejour: {
        token?: string;
        username?: string;
        password?: string;
    };
    malaysiakini: {
        email?: string;
        password?: string;
        refreshToken?: string;
    };
    mangadex: {
        username?: string;
        password?: string;
        clientId?: string;
        clientSecret?: string;
        refreshToken?: string;
    };
    manhuagui: {
        cookie?: string;
    };
    mastodon: {
        apiHost?: string;
        accessToken?: string;
        acctDomain?: string;
    };
    medium: {
        cookies: Record<string, string | undefined>;
        articleCookie?: string;
    };
    mihoyo: {
        cookie?: string;
    };
    miniflux: {
        instance?: string;
        token?: string;
    };
    misskey: {
        accessToken?: string;
    };
    mixi2: {
        authToken?: string;
        authKey?: string;
    };
    mox: {
        cookie: string;
    };
    ncm: {
        cookies?: string;
    };
    newrank: {
        cookie?: string;
    };
    nga: {
        uid?: string;
        cid?: string;
    };
    nhentai: {
        username?: string;
        password?: string;
    };
    notion: {
        key?: string;
    };
    patreon: {
        sessionId?: string;
    };
    pianyuan: {
        cookie?: string;
    };
    pixabay: {
        key?: string;
    };
    pixiv: {
        refreshToken?: string;
        bypassCdn?: boolean;
        bypassCdnHostname?: string;
        bypassCdnDoh?: string;
        imgProxy?: string;
    };
    pkubbs: {
        cookie?: string;
    };
    qingting: {
        id?: string;
    };
    readwise: {
        accessToken?: string;
    };
    saraba1st: {
        cookie?: string;
        host?: string;
    };
    sehuatang: {
        cookie?: string;
    };
    scboy: {
        token?: string;
    };
    scihub: {
        host?: string;
    };
    sdo: {
        ff14risingstones?: string;
        ua?: string;
    };
    sis001: {
        baseUrl?: string;
    };
    skeb: {
        bearerToken?: string;
    };
    sorrycc: {
        cookie?: string;
    };
    spotify: {
        clientId?: string;
        clientSecret?: string;
        refreshToken?: string;
    };
    sspai: {
        bearertoken?: string;
    };
    telegram: {
        token?: string;
        session?: string;
        apiId?: number;
        apiHash?: string;
        maxConcurrentDownloads?: number;
        proxy?: {
            host?: string;
            port?: number;
            secret?: string;
        };
    };
    tophub: {
        cookie?: string;
    };
    tsdm39: {
        cookie: string;
    };
    tumblr: {
        clientId?: string;
        clientSecret?: string;
        refreshToken?: string;
    };
    twitter: {
        username?: string[];
        password?: string[];
        authenticationSecret?: string[];
        phoneOrEmail?: string[];
        authToken?: string[];
        thirdPartyApi?: string;
    };
    uestc: {
        bbsCookie?: string;
        bbsAuthStr?: string;
    };
    weibo: {
        app_key?: string;
        app_secret?: string;
        cookies?: string;
        redirect_url?: string;
    };
    wenku8: {
        cookie?: string;
    };
    wordpress: {
        cdnUrl?: string;
    };
    xiaoyuzhou: {
        device_id?: string;
        refresh_token?: string;
    };
    xiaohongshu: {
        cookie?: string;
    };
    ximalaya: {
        token?: string;
    };
    xsijishe: {
        cookie?: string;
        userAgent?: string;
    };
    xueqiu: {
        cookies?: string;
    };
    yamibo: {
        salt?: string;
        auth?: string;
    };
    youtube: {
        key?: string;
        clientId?: string;
        clientSecret?: string;
        refreshToken?: string;
    };
    zhihu: {
        cookies?: string;
    };
    zodgame: {
        cookie?: string;
    };
    zsxq: {
        accessToken?: string;
    };
    smzdm: {
        cookie?: string;
    };
};
export declare const config: Config;
export declare const setConfig: (env: ConfigEnv) => void;
export {};
//# sourceMappingURL=config.d.ts.map