import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/agri_news',
    categories: ['government'],
    example: '/moa/agri_news',
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
            source: ['moa.gov.tw/'],
        },
    ],
    name: '農業新聞',
    maintainers: ['l-gator'],
    handler,
    url: 'moa.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.moa.gov.tw/open_data.php?format=rss&func=news_agri';

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
                author: $item.find('author').text() || '農業部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '農業新聞 - 農業部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
