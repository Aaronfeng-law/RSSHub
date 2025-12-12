import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/minister-schedule',
    name: '首長行程',
    url: 'moea.gov.tw',
    maintainers: ['l-gator'],
    handler,
    example: '/moea/minister-schedule',
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
            source: ['https://www.moea.gov.tw/Mns/populace/news/NewsRSSdetail.aspx?Kind=10'],
            target: '/minister-schedule',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.moea.gov.tw/Mns/populace/news/NewsRSSdetail.aspx?Kind=10';

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
                author: $item.find('author').text() || '經濟部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '首長行程 - 經濟部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
