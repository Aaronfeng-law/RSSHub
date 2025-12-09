const isObject = (obj) => obj && typeof obj === 'object';
const isPlainObject = (obj) => isObject(obj) && Object.prototype.toString.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) === Object.prototype;
/**
 * A simple camelCase function that only handles strings, but not handling symbol, date, or other complex case.
 * If you need to handle more complex cases, please use camelcase-keys package.
 */
export const camelcaseKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map((x) => camelcaseKeys(x));
    }
    if (isPlainObject(obj)) {
        const result = {};
        for (const key of Object.keys(obj)) {
            const nextKey = isMongoId(key) ? key : camelcase(key);
            result[nextKey] = camelcaseKeys(obj[key]);
        }
        return result;
    }
    return obj;
};
export function camelcase(str) {
    return str.replace(/^_+/, '').replaceAll(/([_-][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
}
const isMongoId = (id) => id.length === 24 && /^[\dA-Fa-f]{24}$/.test(id);
//# sourceMappingURL=camelcase-keys.js.map