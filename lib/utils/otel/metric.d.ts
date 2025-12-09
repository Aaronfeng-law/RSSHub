import type { Attributes } from '@opentelemetry/api';
interface IMetricAttributes extends Attributes {
    method: string;
    path: string;
    status: number;
}
export declare const requestMetric: {
    success: (value: number, attributes: IMetricAttributes) => void;
    error: (attributes: IMetricAttributes) => void;
};
export declare const getContext: () => Promise<string>;
export {};
//# sourceMappingURL=metric.d.ts.map