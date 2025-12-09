import { Route } from '@/types';
import got from '@/utils/got';
import { load } from 'cheerio';

export const route: Route = {
    path: '/clarification',
    categories: ['government'],
    example: '/cec/clarification',
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
            source: ['cec.gov.tw/'],
        },
    ],
    name: '即時新聞澄清',
    maintainers: ['Aaron'],
    handler,
    url: 'cec.gov.tw/',
};

async function handler() {
    const currentUrl = `https://web.cec.gov.tw/api/central/rss/DisputeClarificatio`;

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
                link: link ? new URL(link, currentUrl).href : currentUrl,
                description: title,
            };
        });

    return {
        title: '即時新聞澄清 - 中央銀行',
        link: currentUrl,
        item: items,
    };
}
