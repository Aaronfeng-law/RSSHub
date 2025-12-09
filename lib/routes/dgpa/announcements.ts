import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/announcements',
    categories: ['government'],
    example: '/dgpa/announcements',
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
            source: ['dgpa.gov.tw/'],
        },
    ],
    name: '公告',
    maintainers: ['Aaron'],
    handler,
    url: 'dgpa.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.dgpa.gov.tw/rsscon?uid=83';

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
                author: $item.find('author').text() || '行政院人事行政總處',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '公告 - 行政院人事行政總處',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
