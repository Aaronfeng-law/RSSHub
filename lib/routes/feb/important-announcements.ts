import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/important-announcements',
    categories: ['government'],
    example: '/feb/important-announcements',
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
            source: ['feb.gov.tw/RSS/feb/Messages?serno=201504010001&language=chinese'],
            target: '/important-announcements',
        },
    ],
    name: '訂閱重要公告(含本會及所屬各局)',
    maintainers: ['l-gator'],
    handler,
    url: 'feb.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.feb.gov.tw/RSS/feb/Messages?serno=201504010001&language=chinese';

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
                description: $item.find('description').text() || '',
                author: $item.find('author').text() || '檢查局',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '訂閱重要公告(含本會及所屬各局) - 檢查局',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
