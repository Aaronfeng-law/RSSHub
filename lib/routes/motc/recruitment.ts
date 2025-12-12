import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/recruitment',
    name: '徵才資訊',
    url: 'motc.gov.tw',
    maintainers: ['l-gator'],
    handler,
    example: '/motc/recruitment',
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
            source: ['https://www.motc.gov.tw/ch/app/rss/JobHunt'],
            target: '/recruitment',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.motc.gov.tw/ch/app/rss/JobHunt';

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
                author: $item.find('author').text() || '交通部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '徵才資訊 - 交通部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
