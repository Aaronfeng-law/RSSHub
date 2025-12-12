import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/bulletins',
    name: '法務部',
    url: 'www.moj.gov.tw/',
    maintainers: ['Aaron'],
    handler,
    example: '/moj/bulletins',
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
            source: ['www.moj.gov'],
            target: '/bulletins',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.moj.gov.tw/2204/2795/2799/rss';

    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const $ = load(response.data, { xmlMode: true });

    const items = $('item')
        .toArray()
        .map((item) => {
            const $item = $(item);
            const link = $item.find('link').text().trim();
            return {
                title: $item.find('title').text(),
                link: link || currentUrl,
                description: $item.find('description').text() || '',
                author: $item.find('author').text() || '法務部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '電子公布欄 - 法務部',
        link: $('channel > link').first().text().trim() || currentUrl,
        item: items,
    };
}
