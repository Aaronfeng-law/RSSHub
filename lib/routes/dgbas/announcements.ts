import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/announcements',
    categories: ['government'],
    example: '/dgbas/announcements',
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
            source: ['dgbas.gov.tw/'],
        },
    ],
    name: '公告事項',
    maintainers: ['Aaron'],
    handler,
    url: 'dgbas.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.dgbas.gov.tw/OpenData.aspx?SN=8637FBDFC8D3DBAD';

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
        title: $('channel title').text() || '公告事項 - 行政院主計總處',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
