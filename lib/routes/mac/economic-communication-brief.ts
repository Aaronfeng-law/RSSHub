import { Route } from '@/types';
import { parseDate } from '@/utils/parse-date';
import got from '@/utils/got';
import { load } from 'cheerio';

export const route: Route = {
    path: '/economic-communication-brief',
    categories: ['government'],
    example: '/mac/economic-communication-brief',
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
            source: ['https://www.mac.gov.tw/OpenData.aspx?SN=F29A02A9D36C47F0'],
            target: '/economic-communication-brief',
        },
    ],
    name: '兩岸經濟交流統計速報',
    maintainers: ['l-gator'],
    handler,
    url: 'mac.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.mac.gov.tw/OpenData.aspx?SN=F29A02A9D36C47F0';

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
        title: $('channel title').text() || '兩岸經濟交流統計速報 - 大陸委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
