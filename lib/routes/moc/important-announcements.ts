import { Route } from '@/types';
import { parseDate } from '@/utils/parse-date';
import got from '@/utils/got';
import { load } from 'cheerio';

async function handler() {
    const currentUrl = 'https://www.moc.gov.tw/rss.ashx';

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
                author: $item.find('author').text() || '文化部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '重要公告 - 文化部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}

export const route: Route = {
    path: '/important-announcements',
    categories: ['government'],
    example: '/moc/important-announcements',
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
            source: ['moc.gov.tw/rss.ashx'],
            target: '/important-announcements',
        },
    ],
    name: '重要公告',
    maintainers: ['l-gator'],
    handler,
    url: 'moc.gov.tw/',
};
