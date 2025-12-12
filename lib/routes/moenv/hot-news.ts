import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/hot-news',
    name: '熱門新聞',
    url: 'enews.moenv.gov.tw/',
    maintainers: ['Aaron'],
    handler,
    example: '/moenv/hot-news',
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
            source: ['https://enews.moenv.gov.tw/RSS/RSSNews'],
            target: '/hot-news',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://enews.moenv.gov.tw/RSS/RSSNews';

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
                author: $item.find('author').text() || '環境部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '熱門新聞 - 環境部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
