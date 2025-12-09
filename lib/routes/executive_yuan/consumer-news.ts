import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/consumer-news',
    categories: ['government'],
    example: '/executive_yuan/consumer-news',
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
            source: ['ey.gov.tw/'],
        },
    ],
    name: '消費者保護新聞稿',
    maintainers: ['l-gator'],
    handler,
    url: 'ey.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.ey.gov.tw/RSS_Content.aspx?ModuleType=2';

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
                description: $item.find('description').html() || '',
                author: $item.find('author').text() || 'epaper@ey.gov.tw',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '消費者保護新聞稿 - 行政院',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
