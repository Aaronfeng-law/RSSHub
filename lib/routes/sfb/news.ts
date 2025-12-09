import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news',
    categories: ['government'],
    example: '/sfb/news',
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
            source: ['sfb.gov.tw/RSS/sfb/Messages?serno=201501270006&language=chinese'],
            target: '/news',
        },
    ],
    name: '訂閱新聞稿(含本會及所屬各局)',
    maintainers: ['Aaron'],
    handler,
    url: 'sfb.gov.tw',
};

async function handler() {
    const currentUrl = 'https://www.sfb.gov.tw/RSS/sfb/Messages?serno=201501270006&language=chinese';

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
                author: $item.find('author').text() || '證券期貨局',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '訂閱新聞稿(含本會及所屬各局) - 證券期貨局',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
