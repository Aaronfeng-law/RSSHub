import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/latest-news',
    categories: ['government'],
    example: '/cbc/latest-news',
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
            source: ['cbc.gov.tw/'],
        },
    ],
    name: '最新消息',
    maintainers: ['Aaron'],
    handler,
    url: 'cbc.gov.tw/',
};

async function handler() {
    const rootUrl = 'https://www.cbc.gov.tw';
    const currentUrl = `${rootUrl}/tw/sp-news-list-1.html`;

    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const $ = load(response.data);

    const items = $('.list ul li')
        .toArray()
        .map((item) => {
            const $item = $(item);
            const $a = $item.find('a');
            const title = $a.text().trim();
            const link = $a.attr('href');
            const pubDate = $item.find('time').text();

            return {
                title,
                link: link ? new URL(link, rootUrl).href : currentUrl,
                description: title,
                pubDate: parseDate(pubDate),
            };
        });

    return {
        title: '最新消息 - 中央銀行',
        link: currentUrl,
        item: items,
    };
}
