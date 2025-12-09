import { Route } from '@/types';
import { parseDate } from '@/utils/parse-date';
import got from '@/utils/got';
import { load } from 'cheerio';

export const route: Route = {
    path: '/news-reference',
    name: '新聞參考資料',
    url: 'mofa.gov.tw',
    maintainers: ['Aaron'],
    handler,
    example: '/mofa/news-reference',
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
            source: ['https://www.mofa.gov.tw/OpenData.aspx?SN=896A5E43E1917FFA'],
            target: '/news-reference',
        },
    ],
    view: undefined,
};

async function handler() {
    const currentUrl = 'https://www.mofa.gov.tw/OpenData.aspx?SN=896A5E43E1917FFA';

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
        title: $('channel > title').first().text() || '新聞參考資料 - 外交部',
        link: $('channel > link').first().text() || currentUrl,
        item: items,
    };
}
