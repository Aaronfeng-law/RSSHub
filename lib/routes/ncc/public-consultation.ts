import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/public-consultation',
    name: '意見諮詢',
    url: 'ncc.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/ncc/public-consultation',
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
            source: ['https://www.ncc.gov.tw/chinese/rss/news.aspx?sn_f=54'],
            target: '/public-consultation',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.ncc.gov.tw/chinese/rss/news.aspx?sn_f=54';

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
                author: $item.find('author').text() || '外交部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '意見諮詢 - 外交部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
