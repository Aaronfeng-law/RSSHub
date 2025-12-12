import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news-release',
    categories: ['government'],
    example: '/ftc/news-release',
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
            source: ['ftc.gov.tw/'],
            target: ['/news-release'],
        },
    ],
    name: '新聞稿',
    maintainers: ['l-gator'],
    handler,
    url: 'ftc.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.ftc.gov.tw/internet/main/rss/rss.aspx?rssid=1';

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
                author: $item.find('author').text() || '公平交易委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '新聞稿 - 公平交易委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
