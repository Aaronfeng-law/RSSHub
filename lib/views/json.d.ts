import type { Data } from '@/types';
/**
 * This function should be used by RSSHub middleware only.
 * @param {object} data ctx.state.data
 * @returns `JSON.stringify`-ed [JSON Feed](https://www.jsonfeed.org/)
 */
declare const json: (data: Data) => string;
export default json;
//# sourceMappingURL=json.d.ts.map