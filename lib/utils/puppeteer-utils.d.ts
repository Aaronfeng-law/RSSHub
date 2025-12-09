/**
 * Get Cookie-header-style cookie string from a puppeteer-style cookie array
 *
 * @param {import('puppeteer').Protocol.Network.CookieParam[]} cookies Puppeteer-style cookie array
 * @param {RegExp | string} domainFilter Filter cookies by domain or RegExp
 * @return {string} Cookie-header-style cookie string (e.g. "foobar; foo=bar; baz=qux")
 */
declare const parseCookieArray: (cookies: any, domainFilter?: string | RegExp) => any;
/**
 * Construct a puppeteer-style cookie array from a Cookie-header-style cookie string
 *
 * @param {string} cookieStr Cookie-header-style cookie string (e.g. "foobar; foo=bar; baz=qux")
 * @param {string} domain Domain to set for each cookie
 * @return {import('puppeteer').Protocol.Network.CookieParam[]} Puppeteer-style cookie array
 */
declare const constructCookieArray: (cookieStr: any, domain: any) => any;
/**
 * Set cookies for a page
 *
 * @param {import('puppeteer').Page} page Puppeteer Page object
 * @param {string} cookieStr Cookie-header-style cookie string (e.g. "foobar; foo=bar; baz=qux")
 * @param {string} domain Domain to set for each cookie
 * @return {Promise<void>}
 */
declare const setCookies: (page: any, cookieStr: any, domain: any) => Promise<void>;
/**
 * Get Cookie-header-style cookie string from a page
 *
 * @param {import('puppeteer').Page} page Puppeteer Page object
 * @param {RegExp | string} domainFilter Filter cookies by domain or RegExp
 * @return {Promise<string>} Cookie-header-style cookie string
 */
declare const getCookies: (page: any, domainFilter?: string) => Promise<any>;
export { constructCookieArray, getCookies, parseCookieArray, setCookies };
//# sourceMappingURL=puppeteer-utils.d.ts.map