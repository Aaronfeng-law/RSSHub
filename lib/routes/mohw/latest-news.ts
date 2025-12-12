import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

const handler = async (ctx) => {
    const limit = ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit'), 10) : 30;

    const rootUrl = 'https://www.mohw.gov.tw';
    const currentUrl = new URL('rss.ashx', rootUrl).href;

    const { data: response } = await got(currentUrl);

    const $ = load(response, { xml: true });

    const items = $('item')
        .slice(0, limit)
        .toArray()
        .map((item) => {
            const $item = $(item);

            const title = $item.find('title').text();
            const link = $item.find('link').text();
            const description = $item.find('description').text();
            const author = $item.find('author').text();
            const pubDate = $item.find('pubDate').text();

            return {
                title,
                link,
                description,
                author,
                pubDate: parseDate(pubDate),
            };
        });

    const author = '衛生福利部';
    const title = $('channel title').first().text();
    const description = $('channel description').first().text();
    const image = new URL('images/logo.png', rootUrl).href;

    return {
        title,
        link: rootUrl,
        description,
        image,
        author,
        allowEmpty: true,
        item: items,
    };
};

export const route: Route = {
    path: '/latest-news',
    name: '最新消息',
    url: 'mohw.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/mohw/latest-news',
    parameters: undefined,
    description: undefined,
    categories: ['government'],
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    radar: [
        {
            source: ['mohw.gov.tw/rss.ashx'],
            target: '/latest-news',
        },
    ],
    view: undefined,
};
