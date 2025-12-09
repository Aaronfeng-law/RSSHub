import type { Browser, Page } from 'rebrowser-puppeteer';
/**
 * @deprecated use getPage instead
 * @returns Puppeteer browser
 */
declare const outPuppeteer: () => Promise<Browser>;
export default outPuppeteer;
/**
 * @returns Puppeteer page
 */
export declare const getPuppeteerPage: (url: string, instanceOptions?: {
    onBeforeLoad?: (page: Page, browser?: Browser) => Promise<void> | void;
    gotoConfig?: {
        waitUntil?: "load" | "domcontentloaded" | "networkidle0" | "networkidle2";
    };
    noGoto?: boolean;
}) => Promise<{
    page: Page;
    destory: () => Promise<void>;
    browser: Browser;
}>;
//# sourceMappingURL=puppeteer.d.ts.map