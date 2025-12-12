import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/clarification',
    categories: ['government'],
    example: '/cec/clarification',
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
            target: ['/clarification'],
        },
    ],
    name: '即時新聞澄清',
    maintainers: ['Aaron'],
    handler,
    url: 'cec.gov.tw/',
};

async function handler() {
    const currentUrl = `https://web.cec.gov.tw/api/central/rss/DisputeClarificatio`;

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
        title: $('channel title').text() || '即時新聞澄清 - 中央選舉委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
