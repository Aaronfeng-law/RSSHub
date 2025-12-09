import { PrometheusExporter, PrometheusSerializer } from '@opentelemetry/exporter-prometheus';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { config } from '@/config';
const METRIC_PREFIX = 'rsshub';
const exporter = new PrometheusExporter({});
const provider = new MeterProvider({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'rsshub',
    }),
    readers: [exporter],
});
const serializer = new PrometheusSerializer();
const meter = provider.getMeter('rsshub');
const requestTotal = meter.createCounter(`${METRIC_PREFIX}_request_total`);
const requestErrorTotal = meter.createCounter(`${METRIC_PREFIX}_request_error_total`);
const requestDurationSecondsBucket = meter.createHistogram(`${METRIC_PREFIX}_request_duration_seconds_bucket`, {
    advice: {
        explicitBucketBoundaries: config.otel.seconds_bucket?.split(',').map(Number),
    },
});
const request_duration_milliseconds_bucket = meter.createHistogram(`${METRIC_PREFIX}_request_duration_milliseconds_bucket`, {
    advice: {
        explicitBucketBoundaries: config.otel.milliseconds_bucket?.split(',').map(Number),
    },
});
export const requestMetric = {
    success: (value, attributes) => {
        requestTotal.add(1, attributes);
        request_duration_milliseconds_bucket.record(value, { unit: 'millisecond', ...attributes });
        requestDurationSecondsBucket.record(value / 1000, { unit: 'second', ...attributes });
    },
    error: (attributes) => {
        requestErrorTotal.add(1, attributes);
    },
};
export const getContext = () => new Promise((resolve, reject) => {
    exporter
        .collect()
        .then((value) => {
        resolve(serializer.serialize(value.resourceMetrics));
    })
        .finally(() => {
        reject('');
    });
});
//# sourceMappingURL=metric.js.map