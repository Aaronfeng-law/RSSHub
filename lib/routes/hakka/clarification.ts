import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/clarification',
    categories: ['government'],
    example: '/hakka/clarification',
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
            source: ['hakka.gov.tw/'],
        },
    ],
    name: '澄清稿',
    maintainers: ['Aaron'],
    handler,
    url: 'hakka.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.hakka.gov.tw/chhakka/app/rss/NewsClarification';

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
                author: $item.find('author').text() || '客家委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '澄清稿 - 客家委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}