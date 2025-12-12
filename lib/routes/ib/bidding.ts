import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/bidding',
    categories: ['government'],
    example: '/ib/bidding',
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
            source: ['ib.gov.tw/RSS/ib/Messages?serno=201306280007&language=chinese'],
            target: '/bidding',
        },
    ],
    name: '訂閱招標資訊(含本會及所屬各局)',
    maintainers: ['l-gator'],
    handler,
    url: 'ib.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.ib.gov.tw/RSS/ib/Messages?serno=201306280007&language=chinese';

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
                author: $item.find('author').text() || '保險局',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '訂閱招標資訊(含本會及所屬各局) - 保險局',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
