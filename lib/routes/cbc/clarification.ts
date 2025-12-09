import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';

export const route: Route = {
    path: '/clarification',
    categories: ['government'],
    example: '/cbc/clarification',
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
            source: ['cbc.gov.tw/'],
        },
    ],
    name: '即時新聞澄清',
    maintainers: ['Aaron'],
    handler,
    url: 'cbc.gov.tw/',
};

async function handler() {
    const rootUrl = 'https://www.cbc.gov.tw';
    const currentUrl = `${rootUrl}/tw/lp-1164-1.html`;

    const response = await got({
        method: 'get',
        url: currentUrl,
    });

    const $ = load(response.data);

    const items = $('.list ul li')
        .toArray()
        .map((item) => {
            const $item = $(item);
            const $a = $item.find('a');
            const title = $a.text().trim();
            const link = $a.attr('href');

            return {
                title,
                link: link ? new URL(link, rootUrl).href : currentUrl,
                description: title,
            };
        });

    return {
        title: '即時新聞澄清 - 中央銀行',
        link: currentUrl,
        item: items,
    };
}
