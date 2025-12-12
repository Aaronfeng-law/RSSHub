import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/q-and-a',
    categories: ['government'],
    example: '/sfb/q-and-a',
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
            source: ['sfb.gov.tw/RSS/sfb/Messages?serno=201501270005&language=chinese'],
            target: '/q-and-a',
        },
    ],
    name: '訂閱申報(請)案件表格下載(含本會及所屬各局)',
    maintainers: ['Aaron'],
    handler,
    url: 'sfb.gov.tw',
};

async function handler() {
    const currentUrl = 'https://www.sfb.gov.tw/RSS/sfb/Messages?serno=201501270005&language=chinese';

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
                author: $item.find('author').text() || '證券期貨局',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '訂閱申報(請)案件表格下載(含本會及所屬各局) - 證券期貨局',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
