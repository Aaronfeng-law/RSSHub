import { load } from 'cheerio';
import { config } from '@/config';
import logger from '@/utils/logger';
const templateRegex = /\${([^{}]+)}/g;
const allowedUrlProperties = new Set(['hash', 'host', 'hostname', 'href', 'origin', 'password', 'pathname', 'port', 'protocol', 'search', 'searchParams', 'username']);
// match path or sub-path
const matchPath = (path, paths) => {
    for (const p of paths) {
        if (path.startsWith(p) && (path.length === p.length || path[p.length] === '/')) {
            return true;
        }
    }
    return false;
};
// return true if the path needs to be processed
const filterPath = (path) => {
    const include = config.hotlink.includePaths;
    const exclude = config.hotlink.excludePaths;
    return !(include && !matchPath(path, include)) && !(exclude && matchPath(path, exclude));
};
const interpolate = (str, obj) => str.replaceAll(templateRegex, (_, prop) => {
    let needEncode = false;
    if (prop.endsWith('_ue')) {
        // url encode
        prop = prop.slice(0, -3);
        needEncode = true;
    }
    return needEncode ? encodeURIComponent(obj[prop]) : obj[prop];
});
const parseUrl = (str) => {
    let url;
    try {
        url = new URL(str);
    }
    catch {
        logger.error(`Failed to parse ${str}`);
    }
    return url;
};
const replaceUrl = (template, url) => {
    if (!template || !url) {
        return url;
    }
    const oldUrl = parseUrl(url);
    if (oldUrl && oldUrl.protocol !== 'data:') {
        return interpolate(template, oldUrl);
    }
    return url;
};
const replaceUrls = ($, selector, template, attribute = 'src') => {
    $(selector).each(function () {
        const oldSrc = $(this).attr(attribute);
        if (oldSrc) {
            const url = parseUrl(oldSrc);
            if (url && url.protocol !== 'data:') {
                // Cheerio will do the right thing to prohibit XSS.
                $(this).attr(attribute, interpolate(template, url));
            }
        }
    });
};
const process = (html, image_hotlink_template, multimedia_hotlink_template) => {
    const $ = load(html, undefined, false);
    if (image_hotlink_template) {
        replaceUrls($, 'img, picture > source', image_hotlink_template);
        replaceUrls($, 'video[poster]', image_hotlink_template, 'poster');
        replaceUrls($, '*[data-rsshub-image="href"]', image_hotlink_template, 'href');
    }
    if (multimedia_hotlink_template) {
        replaceUrls($, 'video, video > source, audio, audio > source', multimedia_hotlink_template);
        if (!image_hotlink_template) {
            replaceUrls($, 'video[poster]', multimedia_hotlink_template, 'poster');
        }
    }
    return $.html();
};
const validateTemplate = (template) => {
    if (!template) {
        return;
    }
    for (const match of template.matchAll(templateRegex)) {
        const prop = match[1].endsWith('_ue') ? match[1].slice(0, -3) : match[1];
        if (!allowedUrlProperties.has(prop)) {
            throw new Error(`Invalid URL property: ${prop}`);
        }
    }
};
const middleware = async (ctx, next) => {
    await next();
    let imageHotlinkTemplate;
    let multimediaHotlinkTemplate;
    // Read params if enabled
    if (config.feature.allow_user_hotlink_template) {
        // By default, the config turns these features off. Set corresponding config to
        // true to turn this feature on.
        // A risk is that the media URLs will be replaced by user-supplied templates,
        // so a user could literally take the control of "where are the media from",
        // but only in their personal-use feed URL.
        multimediaHotlinkTemplate = ctx.req.query('multimedia_hotlink_template');
        imageHotlinkTemplate = ctx.req.query('image_hotlink_template');
    }
    // Force config hotlink template on conflict
    if (config.hotlink.template) {
        imageHotlinkTemplate = filterPath(ctx.req.path) ? config.hotlink.template : undefined;
        multimediaHotlinkTemplate = filterPath(ctx.req.path) ? config.hotlink.template : undefined;
    }
    if (!imageHotlinkTemplate && !multimediaHotlinkTemplate) {
        return;
    }
    validateTemplate(imageHotlinkTemplate);
    validateTemplate(multimediaHotlinkTemplate);
    // Assume that only description include image link
    // and here we will only check them in description.
    // Use Cheerio to load the description as html and filter all
    // image link
    const data = ctx.get('data');
    if (data) {
        if (data.image) {
            data.image = replaceUrl(imageHotlinkTemplate, data.image);
        }
        if (data.description) {
            data.description = process(data.description, imageHotlinkTemplate, multimediaHotlinkTemplate);
        }
        if (data.item) {
            for (const item of data.item) {
                if (item.description) {
                    item.description = process(item.description, imageHotlinkTemplate, multimediaHotlinkTemplate);
                }
                if (item.enclosure_url && item.enclosure_type) {
                    if (item.enclosure_type.startsWith('image/')) {
                        item.enclosure_url = replaceUrl(imageHotlinkTemplate, item.enclosure_url);
                    }
                    else if (/^(video|audio)\//.test(item.enclosure_type)) {
                        item.enclosure_url = replaceUrl(multimediaHotlinkTemplate, item.enclosure_url);
                    }
                }
                if (item.image) {
                    item.image = replaceUrl(imageHotlinkTemplate, item.image);
                }
                if (item.itunes_item_image) {
                    item.itunes_item_image = replaceUrl(imageHotlinkTemplate, item.itunes_item_image);
                }
            }
        }
        ctx.set('data', data);
    }
};
export default middleware;
//# sourceMappingURL=anti-hotlink.js.map