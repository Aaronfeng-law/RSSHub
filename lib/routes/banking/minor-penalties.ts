import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/minor-penalties',
    categories: ['government'],
    example: '/banking/minor-penalties',
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
            source: ['banking.gov.tw/'],
        },
    ],
    name: '訂閱非重大裁罰(含本會及所屬各局)',
    maintainers: ['Aaron'],
    handler,
    url: 'banking.gov.tw',
};

async function handler() {
    const currentUrl = 'https://www.banking.gov.tw/RSS/banking/Messages?serno=201203060002&language=chinese';

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
        title: $('channel title').text() || '訂閱非重大裁罰(含本會及所屬各局) - 銀行局',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}