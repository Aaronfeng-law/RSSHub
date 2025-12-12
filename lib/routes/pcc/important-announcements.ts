import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/important-announcements',
    categories: ['government'],
    example: '/pcc/important-announcements',
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
            source: ['pcc.gov.tw/'],
        },
    ],
    name: '公告事項',
    maintainers: ['Aaron'],
    handler,
    url: 'pcc.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.pcc.gov.tw/content/opendata?n=D222AB2C227DC406&item=notice';

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
                author: $item.find('author').text() || '行政院公共工程委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '公告事項 - 行政院公共工程委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}