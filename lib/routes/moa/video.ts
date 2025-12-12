import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/video',
    categories: ['government'],
    example: '/moa/video',
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
            source: ['moa.gov.tw/'],
        },
    ],
    name: '影音專區',
    maintainers: ['l-gator'],
    handler,
    url: 'moa.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.moa.gov.tw/open_data.php?format=rss&func=coa_video';

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
                author: $item.find('author').text() || '農業部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '影音專區 - 農業部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
