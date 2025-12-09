import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { config } from '@/config';
import { getDebugInfo } from '@/utils/debug-info';
import { gitDate, gitHash } from '@/utils/git-hash';
import { Layout } from '@/views/layout';
const startTime = Date.now();
const Index = ({ debugQuery }) => {
    const debug = getDebugInfo();
    const showDebug = !config.debugInfo || config.debugInfo === 'false' ? false : config.debugInfo === 'true' || config.debugInfo === debugQuery;
    const { disallowRobot, nodeName, cache } = config;
    const duration = Date.now() - startTime;
    const info = {
        showDebug,
        disallowRobot,
        debug: [
            ...(nodeName
                ? [
                    {
                        name: 'Node Name',
                        value: nodeName,
                    },
                ]
                : []),
            ...(gitHash
                ? [
                    {
                        name: 'Git Hash',
                        value: (_jsx("a", { className: "underline", href: `https://github.com/DIYgod/RSSHub/commit/${gitHash}`, children: gitHash })),
                    },
                ]
                : []),
            ...(gitDate
                ? [
                    {
                        name: 'Git Date',
                        value: gitDate.toUTCString(),
                    },
                ]
                : []),
            {
                name: 'Cache Duration',
                value: cache.routeExpire + 's',
            },
            {
                name: 'Request Amount',
                value: debug.request,
            },
            {
                name: 'Request Frequency',
                value: ((debug.request / (duration / 1000)) * 60).toFixed(3) + ' times/minute',
            },
            {
                name: 'Cache Hit Ratio',
                value: debug.request ? ((debug.hitCache / debug.request) * 100).toFixed(2) + '%' : 0,
            },
            {
                name: 'ETag Matched Ratio',
                value: debug.request ? ((debug.etag / debug.request) * 100).toFixed(2) + '%' : 0,
            },
            {
                name: 'Health',
                value: debug.request ? ((1 - debug.error / debug.request) * 100).toFixed(2) + '%' : 0,
            },
            {
                name: 'Uptime',
                value: (duration / 3_600_000).toFixed(2) + ' hour(s)',
            },
            {
                name: 'Hot Routes',
                value: Object.keys(debug.routes)
                    .toSorted((a, b) => debug.routes[b] - debug.routes[a])
                    .slice(0, 30)
                    .map((route) => (_jsxs(_Fragment, { children: [debug.routes[route], " ", route, _jsx("br", {})] }))),
            },
            {
                name: 'Hot Paths',
                value: Object.keys(debug.paths)
                    .toSorted((a, b) => debug.paths[b] - debug.paths[a])
                    .slice(0, 30)
                    .map((path) => (_jsxs(_Fragment, { children: [debug.paths[path], " ", path, _jsx("br", {})] }))),
            },
            {
                name: 'Hot Error Routes',
                value: Object.keys(debug.errorRoutes)
                    .toSorted((a, b) => debug.errorRoutes[b] - debug.errorRoutes[a])
                    .slice(0, 30)
                    .map((route) => (_jsxs(_Fragment, { children: [debug.errorRoutes[route], " ", route, _jsx("br", {})] }))),
            },
            {
                name: 'Hot Error Paths',
                value: Object.keys(debug.errorPaths)
                    .toSorted((a, b) => debug.errorPaths[b] - debug.errorPaths[a])
                    .slice(0, 30)
                    .map((path) => (_jsxs(_Fragment, { children: [debug.errorPaths[path], " ", path, _jsx("br", {})] }))),
            },
        ],
    };
    return (_jsxs(Layout, { children: [_jsx("div", { className: "pointer-events-none absolute w-full min-h-screen", style: {
                    backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMicgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyBmaWxsPSdub25lJyBzdHJva2U9J3JnYigxNSAyMyA0MiAvIDAuMDQpJz48cGF0aCBkPSdNMCAuNUgzMS41VjMyJy8+PC9zdmc+')`,
                    maskImage: 'linear-gradient(transparent, black, transparent)',
                } }), _jsxs("div", { className: "w-full grow shrink-0 py-8 flex items-center justify-center flex-col space-y-4", children: [_jsx("img", { src: "./logo.png", alt: "RSSHub", width: "100", loading: "lazy" }), _jsxs("h1", { className: "text-4xl font-bold", children: ["Welcome to ", _jsx("span", { className: "text-[#F5712C]", children: "RSSHub" }), "!"] }), _jsx("p", { className: "text-xl font-medium text-zinc-600", children: "The world's largest RSS Network." }), _jsx("p", { className: "text-zinc-500", children: "If you see this page, the RSSHub is successfully installed and working." }), _jsxs("div", { className: "font-bold space-x-4 text-sm", children: [_jsx("a", { target: "_blank", href: "https://docs.rsshub.app", children: _jsx("button", { className: "text-white bg-[#F5712C] hover:bg-[#DD4A15] py-2 px-4 rounded-full transition-colors", children: "Home" }) }), _jsx("a", { target: "_blank", href: "https://github.com/DIYgod/RSSHub", children: _jsx("button", { className: "bg-zinc-200 hover:bg-zinc-300 py-2 px-4 rounded-full transition-colors", children: "GitHub" }) })] }), info.showDebug ? (_jsxs("details", { className: "text-xs w-96 !mt-8 max-h-[400px] overflow-auto", children: [_jsx("summary", { className: "text-sm cursor-pointer", children: "Debug Info" }), info.debug.map((item) => (_jsxs("div", { class: "debug-item my-3 pl-8", children: [_jsxs("span", { class: "debug-key w-32 text-right inline-block mr-2", children: [item.name, ": "] }), _jsx("span", { class: "debug-value inline-block break-all align-top", children: item.value })] })))] })) : null] }), _jsxs("div", { className: "text-center pt-4 pb-8 w-full text-sm font-medium space-y-2", children: [_jsxs("p", { className: "space-x-4", children: [_jsx("a", { target: "_blank", href: "https://github.com/DIYgod/RSSHub", children: _jsx("img", { className: "inline", src: "https://icons.ly/github/_/fff", alt: "github", width: "20", height: "20" }) }), _jsx("a", { target: "_blank", href: "https://t.me/rsshub", children: _jsx("img", { className: "inline", src: "https://icons.ly/telegram", alt: "telegram group", width: "20", height: "20" }) }), _jsx("a", { target: "_blank", href: "https://t.me/awesomeRSSHub", children: _jsx("img", { className: "inline", src: "https://icons.ly/telegram", alt: "telegram channel", width: "20", height: "20" }) }), _jsx("a", { target: "_blank", href: "https://x.com/intent/follow?screen_name=_RSSHub", className: "text-[#F5712C]", children: _jsx("img", { className: "inline", src: "https://icons.ly/x", alt: "X", width: "20", height: "20" }) })] }), _jsxs("p", { className: "!mt-6", children: ["Please consider", ' ', _jsx("a", { target: "_blank", href: "https://docs.rsshub.app/sponsor", className: "text-[#F5712C]", children: "sponsoring" }), ' ', "to help keep this open source project alive."] }), _jsxs("p", { children: ["Made with \u2764\uFE0F by", ' ', _jsx("a", { target: "_blank", href: "https://diygod.cc", className: "text-[#F5712C]", children: "DIYgod" }), ' ', "and", ' ', _jsx("a", { target: "_blank", href: "https://github.com/DIYgod/RSSHub/graphs/contributors", className: "text-[#F5712C]", children: "Contributors" }), ' ', "under MIT License."] })] })] }));
};
export default Index;
//# sourceMappingURL=index.js.map