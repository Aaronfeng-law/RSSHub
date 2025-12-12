import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news-release',
    categories: ['government'],
    example: '/fsc/news-release',
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
            source: ['fsc.gov.tw/RSS/Messages?serno=201202290009&language=chinese'],
            target: '/news-release',
        },
    ],
    name: '新聞稿(含本會及所屬各局)',
    maintainers: ['l-gator'],
    handler,
    url: 'fsc.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.fsc.gov.tw/RSS/Messages?serno=201202290009&language=chinese';

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
                author: $item.find('author').text() || '金融監督管理委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '新聞稿(含本會及所屬各局) - 金融監督管理委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
