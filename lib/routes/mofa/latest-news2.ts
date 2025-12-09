import { Route } from '@/types';
import { parseDate } from '@/utils/parse-date';
import got from '@/utils/got';
import { load } from 'cheerio';

export const route: Route = {
    path: '/latest-news2',
    name: '最新消息2',
    url: 'mofa.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/mofa/latest-news2',
    parameters: undefined,
    description: undefined,
    categories: ['government'],
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
            source: ['https://www.mofa.gov.tw/OpenData.aspx?SN=AF58E98D7F27B8E8'],
            target: '/latest-news2',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.mofa.gov.tw/OpenData.aspx?SN=AF58E98D7F27B8E8';

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
                author: $item.find('author').text() || '外交部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel > title').first().text() || '最新消息2 - 外交部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
