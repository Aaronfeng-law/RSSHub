import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/explain-material',
    categories: ['government'],
    example: '/mac/explain-material',
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
            source: ['https://www.mac.gov.tw/OpenData.aspx?SN=FB01D469347C76A7'],
            target: '/explain-material',
        },
    ],
    name: '說明資料',
    maintainers: ['l-gator'],
    handler,
    url: 'mac.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.mac.gov.tw/OpenData.aspx?SN=FB01D469347C76A7';
    const response = await got(currentUrl);
    const $ = load(response.data);
    const items = $('item')
        .toArray()
        .map((item) => {
            const $item = $(item);
            return {
                title: $item.find('title').text(),
                link: $item.find('link').text(),
                description: $item.find('description').text() || '',
                author: $item.find('author').text() || '大陸委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });
    return {
        title: $('channel > title').first().text() || '說明資料 - 大陸委員會',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
