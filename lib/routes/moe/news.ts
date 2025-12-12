import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news',
    name: '即時新聞',
    url: 'moe.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/moe/news',
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
            source: ['www.moe.gov.tw/'],
            target: '/news',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.edu.tw/Rss_News.aspx?n=9E7AC85F1954DDA8';

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
                author: $item.find('author').text() || '教育部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '即時新聞 - 教育部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
