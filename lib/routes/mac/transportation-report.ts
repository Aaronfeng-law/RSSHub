import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/transportation-report',
    categories: ['government'],
    example: '/mac/transportation-report',
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
            source: ['https://www.mac.gov.tw/OpenData.aspx?SN=163B8937FBE0F186'],
            target: '/transportation-report',
        },
    ],
    name: '金馬小三通航運人員往來統計月報',
    maintainers: ['l-gator'],
    handler,
    url: 'mac.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.mac.gov.tw/OpenData.aspx?SN=163B8937FBE0F186';

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
        title: $('channel title').text() || '金馬小三通航運人員往來統計月報 - 大陸委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
