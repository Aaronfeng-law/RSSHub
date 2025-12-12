import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/bulletin',
    name: '公布欄',
    url: 'mol.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/mol/bulletin',
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
            source: ['www.mol.gov.tw/'],
            target: '/bulletin',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.mol.gov.tw/1607/1632/2665/RssList';

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
                author: $item.find('author').text() || '勞動部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '公布欄 - 勞動部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
