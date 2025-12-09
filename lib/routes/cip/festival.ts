import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/festival',
    categories: ['government'],
    example: '/cip/festival',
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
    name: '歲時祭儀專區',
    maintainers: ['Aaron'],
    handler,
    url: 'cip.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.cip.gov.tw/zh-tw/rss/0991B05985DBFF77/news.html';

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
        title: $('channel title').text() || '歲時祭儀專區 - 原住民族委員會',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
