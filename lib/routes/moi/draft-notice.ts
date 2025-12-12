import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/draft-notice',
    categories: ['government'],
    example: '/moi/draft-notice',
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
            source: ['moi.gov.tw/OpenData.aspx?SN=3148769B8A76FD66'],
            target: '/draft-notice',
        },
    ],
    name: '草案預告',
    maintainers: ['Aaron'],
    handler,
    url: 'moi.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.moi.gov.tw/OpenData.aspx?SN=3148769B8A76FD66';

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
                author: $item.find('author').text() || '內政部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '草案預告 - 內政部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
