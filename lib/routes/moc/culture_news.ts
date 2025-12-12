import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/culture_news',
    categories: ['government'],
    example: '/moa/culture_news',
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
            source: ['moa.gov.tw/'],
            target: '/culture_news',
        },
    ],
    name: '文化新聞',
    maintainers: ['l-gator'],
    handler,
    url: 'moa.gov.tw',
};

async function handler() {
    const currentUrl = 'https://www.moc.gov.tw/OpenData.aspx?SN=C4E4E3A8E687AD91';

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
                description: $item.find('description').text(),
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '最新消息 - 文化部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
