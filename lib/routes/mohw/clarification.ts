import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/clarification',
    categories: ['government'],
    example: '/mohw/clarification',
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
    name: '即時新聞澄清',
    maintainers: ['nczitzk'],
    handler,
    url: 'mohw.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.mohw.gov.tw/rss-17-1.html';

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
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '即時新聞澄清 - 台灣衛生福利部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
