declare function transElemText($: any, prop: any): any;
declare function replaceParams(data: any, prop: any, $: any): any;
declare function getProp(data: any, prop: any, $: any): any;
declare function buildData(data: any): Promise<{
    link: any;
    title: any;
    description: any;
    allowEmpty: any;
    item: {
        title: any;
        description: any;
        pubDate: any;
        link: any;
        guid: any;
    }[];
}>;
export default buildData;
export { getProp, replaceParams, transElemText };
//# sourceMappingURL=common-config.d.ts.map