import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news-release',
    categories: ['government'],
    example: '/sports/news-release',
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
            source: ['sports.gov.tw/'],
            target: '/news-release',
        },
    ],
    name: '新聞專區',
    maintainers: ['Aaron'],
    handler,
    url: 'sports.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://siteapi.sports.gov.tw/1/News/309?handler=OpenDataRSS';

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
                author: $item.find('author').text() || '運動部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '新聞專區 - 運動部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
