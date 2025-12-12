import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/hr',
    name: '求才資訊',
    url: 'nstc.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/nstc/hr',
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
            source: ['www.nstc.gov.tw'],
            target: '/hr',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.nstc.gov.tw/nstc/rss/hr';

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
                author: $item.find('author').text() || '國家科學及技術委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '求才資訊 - 國家科學及技術委員會',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
