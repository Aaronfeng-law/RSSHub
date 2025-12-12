import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news-release',
    name: '即時新聞澄清',
    url: 'vac.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/vac/news-release',
    parameters: undefined,
    description: undefined,
    categories: ['government'],
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
            source: ['www.vac.gov.tw/'],
            target: '/news-release',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.vac.gov.tw/rss-1788-1.html';

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
                author: $item.find('author').text() || '國軍退除役官兵輔導委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '即時新聞澄清 - 國軍退除役官兵輔導委員會',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
