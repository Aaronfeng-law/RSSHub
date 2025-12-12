import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/latest-news',
    categories: ['government'],
    example: '/ftc/latest-news',
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
            target: ['/latest-news'],
        },
    ],
    name: '最新消息',
    maintainers: ['l-gator'],
    handler,
    url: 'ftc.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.ftc.gov.tw/internet/main/rss/rss.aspx?rssid=2';

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
        title: $('channel title').text() || '最新消息 - 公平交易委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
