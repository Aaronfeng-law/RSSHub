import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/clarification',
    categories: ['government'],
    example: '/feb/clarification',
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
            source: ['feb.gov.tw/RSS/feb/Messages?serno=201504010003&language=chinese'],
            target: '/clarification',
        },
    ],
    name: '即時新聞澄清',
    maintainers: ['l-gator'],
    handler,
    url: 'feb.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.feb.gov.tw/RSS/feb/Messages?serno=201504010003&language=chinese';

    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const $ = load(response.data, { xmlMode: true });

    const items = $('item')
        .toArray()
        .filter((item) => {
            const $item = $(item);
            const title = $item.find('title').text();
            const description = $item.find('description').text();
            return title.includes('澄清') || description.includes('澄清');
        })
        .map((item) => {
            const $item = $(item);
            return {
                title: $item.find('title').text(),
                link: $item.find('link').text(),
                description: $item.find('description').text() || '',
                author: $item.find('author').text() || '檢查局',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '即時新聞澄清 - 檢查局',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
