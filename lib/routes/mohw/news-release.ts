import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news-release',
    categories: ['government'],
    example: '/mohw/news-release',
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
            source: ['mohw.gov.tw/'],
        },
    ],
    name: '衛生福利部公告訊息',
    maintainers: ['Aaron'],
    handler,
    url: 'mohw.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.mohw.gov.tw/rss-18-1.html';

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
                author: $item.find('author').text() || '衛生福利部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '衛生福利部公告訊息 - 台灣衛生福利部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}