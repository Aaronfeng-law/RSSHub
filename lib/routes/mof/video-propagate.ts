import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/video-propagate',
    name: '影音宣導公告',
    url: 'mof.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/mof/video-propagate',
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
            source: ['https://www.mof.gov.tw/Rss/58f884cdd92649f593237de000142d49'],
            target: '/video-propagate',
        },
    ],
    view: undefined,
};
async function handler() {
    const currentUrl = 'https://www.mof.gov.tw/Rss/58f884cdd92649f593237de000142d49';

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
                author: $item.find('author').text() || '財政部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '影音宣導公告 - 財政部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
