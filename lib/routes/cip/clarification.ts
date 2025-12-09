import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/clarification',
    categories: ['government'],
    example: '/cip/clarification',
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
            source: ['cip.gov.tw/'],
        },
    ],
    name: '爭議訊息澄清專區',
    maintainers: ['Aaron'],
    handler,
    url: 'cip.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.cip.gov.tw/zh-tw/rss/7E713E918EE93880/news.html';

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
        title: $('channel title').text() || '爭議訊息澄清專區 - 原住民族委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
