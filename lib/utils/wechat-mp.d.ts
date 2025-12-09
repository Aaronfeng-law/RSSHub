/**
 * Author: @Rongronggg9
 *
 * There are at least three folders which are relevant with WeChat MP (Official Account Platform / Media Platform):
 * lib/routes/wechat
 * lib/routes/gov/npma
 * lib/routes/gzh360
 * lib/routes/pku/nsd/gd
 * lib/routes/sdu/cs
 * lib/routes/nua/utils
 * lib/routes/hrbeu
 * lib/routes/freewechat
 *
 * If your new route is not in the above folders, please add it to the list.
 *
 * If your route needs to fetch MP articles from mp.weixin.qq.com, you SHOULD use `finishArticleItem`.
 * However, if your route need to determine some metadata by itself, you MAY use `fetchArticle`.
 * If you find more metadata on the webpage, consider modifying `fetchArticle` to include them.
 * NEVER fetch MP articles from mp.weixin.qq.com in your route in order to avoid cache key collision.
 * NO NEED TO use cache if you are using `finishArticleItem` or `fetchArticle`, they will handle cache for you.
 *
 * If your route fetches MP articles from other websites, you SHOULD use `fixArticleContent` to fix the content format.
 * If you find more fixes that should be applied, consider modifying `fixArticleContent` to include them.
 *
 * For more details of these functions, please refer to the jsDoc in the source code.
 */
import type { Cheerio, CheerioAPI } from 'cheerio';
import type { Element } from 'domhandler';
declare class WeChatMpError extends Error {
    constructor(message: string);
}
declare class ExtractMetadata {
    private static genAssignmentRegExp;
    private static genExtractFunc;
    private static doExtract;
    private static commonMetadataToBeExtracted;
    static common: ($: CheerioAPI) => any;
    private static audioMetadataToBeExtracted;
    static audio: ($: CheerioAPI) => any;
    private static imgMetadataToBeExtracted;
    static img: ($: CheerioAPI) => any;
    private static locationMetadataToBeExtracted;
    static location: ($: CheerioAPI) => any;
}
/**
 * Articles from WeChat MP have weird formats, this function is used to fix them.
 *
 * Even though your content are not directly fetched from WeChat MP, you SHOULD still call this function.
 * Calling this function is safe in most situations.
 *
 * Example usage: item.description = fixArticleContent($('div#js_content.rich_media_content'));
 * @param {*} html - The html to be fixed, a string or a cheerio object.
 * @param {boolean} skipImg - Whether to skip fixing images.
 * @return {string} - The fixed html, a string.
 */
declare const fixArticleContent: (html?: string | Cheerio<Element>, skipImg?: boolean) => string;
declare const normalizeUrl: (url: string, bypassHostCheck?: boolean) => string;
/**
 * Fetch article and its metadata from WeChat MP (mp.weixin.qq.com).
 *
 * If you use this function, no need to call `fixArticleContent`
 * @param url - The url of the article.
 * @param bypassHostCheck - Whether to bypass host check.
 * @return - An object containing the article and its metadata.
 */
declare const fetchArticle: (url: string, bypassHostCheck?: boolean) => Promise<{
    title: string;
    author: string;
    description: string;
    summary: string;
    pubDate?: Date;
    mpName?: string;
    link: string;
    enclosure_type?: string;
    enclosure_url?: string;
    itunes_duration?: string | number;
}>;
/**
 * Fetch article and its metadata from WeChat MP (mp.weixin.qq.com), then fill the `item` object with the result.
 *
 * If you use this function, no need to call `fetchArticle` or `fixArticleContent`
 *
 * A new route SHOULD use this function instead of manually calling the above functions
 *
 * An existing route adopting this function SHOULD either:
 * - set `skipLink` to true (not recommended)
 * - set `item.guid` to `item.link` BEFORE calling this function
 * @param {object} ctx - The context object.
 * @param {object} item - The item object to be filled.
 * @param {boolean} setMpNameAsAuthor - If `true`, `author` will be the MP itself, otherwise the real author of the article.
 * @param {boolean} skipLink - Whether to skip overriding `item.link` with the normalized url.
 * @return {Promise<object>} - The incoming `item` object, with the article and its metadata filled in.
 */
declare const finishArticleItem: (item: any, setMpNameAsAuthor?: boolean, skipLink?: boolean) => Promise<any>;
declare const exportedForTestingOnly: {
    toggleWerror: (on: boolean) => void;
    ExtractMetadata: typeof ExtractMetadata;
    showTypeMapReverse: {
        [k: string]: string;
    };
};
export { exportedForTestingOnly, fetchArticle, finishArticleItem, fixArticleContent, normalizeUrl, WeChatMpError };
//# sourceMappingURL=wechat-mp.d.ts.map