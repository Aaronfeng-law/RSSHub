import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/news-release',
    categories: ['government'],
    example: '/dgbas/news-release',
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
    name: '新聞稿',
    maintainers: ['Aaron'],
    handler,
    url: 'dgbas.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.dgbas.gov.tw/OpenData.aspx?SN=0DA0FD2F5416554E';

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
        title: $('channel title').text() || '新聞稿 - 行政院主計總處',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
