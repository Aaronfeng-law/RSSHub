import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news-release',
    name: '新聞發布',
    url: 'enews.moenv.gov.tw/',
    maintainers: ['Aaron'],
    handler,
    example: '/moenv/news-release',
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
            source: ['https://enews.moenv.gov.tw/RSS/News'],
            target: '/news-release',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://enews.moenv.gov.tw/RSS/News';

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
        title: $('channel > title').first().text() || '新聞發布 - 環境部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
