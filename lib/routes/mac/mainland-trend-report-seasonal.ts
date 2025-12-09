import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/mainland-trend-report-seasonal',
    categories: ['government'],
    example: '/mac/mainland-trend-report-seasonal',
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
            source: ['https://www.mac.gov.tw/OpenData.aspx?SN=6A6B57F5FE966020'],
            target: '/mainland-trend-report-seasonal',
        },
    ],
    name: '大陸情勢季報',
    maintainers: ['l-gator'],
    handler,
    url: 'mac.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.mac.gov.tw/OpenData.aspx?SN=6A6B57F5FE966020';

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
                author: $item.find('author').text() || '大陸委員會',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '大陸情勢季報 - 大陸委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
