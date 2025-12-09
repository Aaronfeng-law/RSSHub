import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/video',
    categories: ['government'],
    example: '/moi/video',
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
            source: ['moi.gov.tw/OpenData.aspx?SN=EC4328B64AFBC86A'],
            target: '/video',
        },
    ],
    name: '網路影音',
    maintainers: ['Aaron'],
    handler,
    url: 'moi.gov.tw/',
};

async function handler() {
    const currentUrl = 'https://www.moi.gov.tw/OpenData.aspx?SN=EC4328B64AFBC86A';

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
                author: $item.find('author').text() || '內政部',
                pubDate: parseDate($item.find('pubDate').text()),
            };
        });

    return {
        title: $('channel title').text() || '網路影音 - 內政部',
        link: $('channel link').text() || currentUrl,
        item: items,
    };
}
