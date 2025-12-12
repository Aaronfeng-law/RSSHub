import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/tender',
    name: '招標資訊',
    url: 'oac.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/nstc/tender',
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
            source: ['www.oac.gov.tw'],
            target: '/tender',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.oac.gov.tw/tender?language=chinese&websitedn=ch';

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
                author: $item.find('author').text() || '海洋委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '招標資訊 - 海洋委員會',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
