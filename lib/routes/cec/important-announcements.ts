import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/important-announcements',
    categories: ['government'],
    example: '/cec/important-announcements',
    parameters: {},
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
            source: ['cec.gov.tw/'],
            target: ['/important-announcements'],
        },
    ],
    name: '公告',
    maintainers: ['Aaron'],
    handler,
    url: 'cec.gov.tw/',
};

async function handler() {
    const currentUrl = `https://web.cec.gov.tw/api/central/rss/bulletin`;

    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const $ = load(response.data, { xmlMode: true });

    const items = $('item')
        .toArray()
        .map((item) => {
            const $item = $(item);
            return {
                title: $item.find('title').text(),
                link: $item.find('link').text(),
                description: $item.find('description').text(),
                author: $item.find('author').text() || '中央選舉委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '公告 - 中央選舉委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
