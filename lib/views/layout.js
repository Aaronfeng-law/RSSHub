import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Layout = (props) => (_jsxs("html", { children: [_jsxs("head", { children: [_jsx("title", { children: "Welcome to RSSHub!" }), _jsx("script", { src: "https://cdn.tailwindcss.com" }), _jsx("style", { children: `
                details::-webkit-scrollbar {
                    width: 0.25rem;
                }
                details::-webkit-scrollbar-thumb {
                    border-radius: 0.125rem;
                    background-color: #e4e4e7;
                }
                details::-webkit-scrollbar-thumb:hover {
                    background-color: #a1a1aa;
                }

                @font-face {
                    font-family: SN Pro;
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: url(https://cdn.jsdelivr.net/fontsource/fonts/sn-pro@latest/latin-400-normal.woff2) format(woff2);
                }
                @font-face {
                    font-family: SN Pro;
                    font-style: normal;
                    font-display: swap;
                    font-weight: 500;
                    src: url(https://cdn.jsdelivr.net/fontsource/fonts/sn-pro@latest/latin-500-normal.woff2) format(woff2);
                }
                @font-face {
                    font-family: SN Pro;
                    font-style: normal;
                    font-display: swap;
                    font-weight: 700;
                    src: url(https://cdn.jsdelivr.net/fontsource/fonts/sn-pro@latest/latin-700-normal.woff2) format(woff2);
                }
                body {
                    font-family: SN Pro, sans-serif;
                }
                ` })] }), _jsx("body", { className: "antialiased min-h-screen text-zinc-700 flex flex-col", children: props.children })] }));
//# sourceMappingURL=layout.js.map