import {
    get,
    has,
    includes,
    isArray,
    isBoolean,
    isFunction,
    isMap,
    isNil,
    isPlainObject,
    isSet,
    keys,
    map,
    merge,
    noop,
    some,
    transform,
} from "lodash";
import { createDomain, Domain, Effect, Event, is, Store, Unit } from "effector";

import { config } from "config";

import devHelpers, { DevTools, isSimpleType, markers as m } from "./debug";

// shut up loggers on `production`
const isDev = config.isDev;
const logGroup = typeof window !== "undefined" && isDev ? (devHelpers as DevTools).logGroup : noop;

const colors = {
    fail: "!",
    query: "?",
    ok: "*",
    data: "#",
    event: "@",
    fx: "&",
    green: "%",
    blue: "@",
    orange: "$",
    red: "!",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;
type ConfigFn = (payload: AnyType) => AnyType;
type ConfigColor = keyof typeof colors;

export type ConfigLogger = {
    colors?: Record<string, ConfigColor>;
    filter?: Record<string, boolean>;
    fn?: Record<string, ConfigFn>;
    options?: Record<string, Parameters<DevTools["logGroup"]>[2]>;
};

export type ConfigOptions = ConfigLogger & {
    kind: string;
};

export type DomainWatch = boolean | Record<string, boolean>;

type Config = {
    domain?: Domain;
    logger?: ConfigLogger;
    options?: ConfigOptions;
};

type MergedConfig = Required<ConfigLogger> & {
    named: (n: string) => string;
};

export function createDomainWatched(
    name?: string,
    configData?: Config | ConfigLogger,
    watch?: DomainWatch,
) {
    const config = (
        some(configData, (_, key) => includes(["domain", "logger", "options"], key))
            ? configData
            : { logger: configData }
    ) as Config;
    const { domain: domainConfig, logger = {}, options } = config ?? {};
    const domainName = options?.kind ? `${options.kind}-${name}` : name;

    const isWatched = (isBoolean(watch) ? watch : watch?.[options?.kind ?? ""]) ?? true;
    if (isWatched) {
        const domain = createDomain(domainName, { domain: domainConfig });

        const mergedConfig: MergedConfig = {
            named: (n) => (options?.kind ? `${n}.${options.kind}` : n),
            colors: merge({}, logger.colors, options?.colors),
            filter: merge({}, logger.filter, options?.filter),
            fn: merge({}, logger.fn, options?.fn),
            options: merge({}, logger.options, options?.options),
        };

        domain.onCreateEvent(attachEvent(domain, mergedConfig));
        domain.onCreateStore(attachStore(domain, mergedConfig));
        domain.onCreateEffect(attachEffect(domain, mergedConfig));
        return domain;
    }
    return createDomain(domainName, { domain: domainConfig });
}

function watch(unit: Unit<AnyType>, fn: (payload: AnyType) => AnyType) {
    if (is.store(unit)) fn(unit.getState());
    const $watchUnit = (is.store(unit) ? unit.updates : unit) as AnyType;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    $watchUnit.watch(fn);
}

function isGate(name: string) {
    return includes(name, "/gate");
}

function extraParams(name: string, config: MergedConfig, payload?: AnyType, isStore = false) {
    if (isGate(name)) {
        const disableGate = config.filter["gate"];
        if (disableGate === false) return null;
        return includes(name, ".open") ? "OPEN" : includes(name, ".close") ? "CLOSED" : null;
    }
    const disableRootOnly = config.filter[name + "_root"];
    if (disableRootOnly === false) return null;
    else {
        const disableAll = config.filter[name.replace("_done", "")];
        if (disableAll === false) return null;
    }
    const fn = config.fn[name] ?? (isStore ? genericStore : undefined);
    const params = isFunction(fn) ? fn(payload) : null;
    return params ? ` [${params}]` : "";
}

function withPayload(payload: AnyType) {
    return isNil(payload) ? [] : isSimpleType(payload) || isArray(payload) ? { payload } : payload;
}

type OutputParams = {
    color: ConfigColor;
    domain: string;
    shortName: string;
    name: string;
    kind: string;
    extra: string;
};

function withColors(params: OutputParams, config?: ConfigLogger) {
    const { color: defaultColor, domain, name, shortName, kind, extra } = params;
    const colorKey = config?.colors?.[shortName] ?? config?.colors?.[name];
    const color = colors[colorKey ?? defaultColor];
    if (kind === "store") {
        return `${color}{>>}{${color}${name ?? domain}}${m._dim(":" + kind)}${extra}`;
    }
    return `${color}{>>}${domain}${m._dim(":" + kind)} {${color}${name}}${extra}`;
}

function attachEvent(domain: Domain, config: MergedConfig) {
    return (event: Event<AnyType>) => {
        watch(event, (payload) => {
            const extra = extraParams(event.shortName, config, payload);
            if (extra !== null) {
                const asGate = isGate(event.shortName);
                const params: OutputParams = {
                    color: asGate ? (extra === "OPEN" ? "query" : "fail") : "event",
                    domain: domain.shortName,
                    shortName: event.shortName,
                    name: asGate ? extra : config.named(event.shortName),
                    kind: asGate ? "gate" : "event",
                    extra: asGate ? "" : extra,
                };
                logGroup(
                    withColors(params, config),
                    withPayload(payload),
                    config.options[event.shortName],
                );
            }
        });
    };
}

function attachStore(domain: Domain, config: MergedConfig) {
    return (store: Store<AnyType>) => {
        watch(store, (value) => {
            const extra = extraParams(store.shortName, config, value, true);
            if (extra !== null) {
                const asGate = isGate(store.shortName);
                const params: OutputParams = {
                    color: "query",
                    domain: domain.shortName,
                    shortName: store.shortName,
                    name: config.named(store.shortName),
                    kind: asGate ? "gate" : "store",
                    extra,
                };
                logGroup(
                    withColors(params, config),
                    withPayload(value),
                    config.options[store.shortName],
                );
            }
        });
    };
}

function attachEffect(domain: Domain, config: MergedConfig) {
    return (effect: Effect<AnyType, AnyType, AnyType>) => {
        watch(effect, (parameters) => {
            const extra = extraParams(effect.shortName, config, parameters);
            if (extra !== null) {
                const params: OutputParams = {
                    color: "fx",
                    domain: domain.shortName,
                    shortName: effect.shortName,
                    name: config.named(effect.shortName),
                    kind: "effect",
                    extra,
                };
                logGroup(
                    withColors(params, config),
                    withPayload(parameters),
                    config.options[effect.shortName],
                );
            }
        });

        watch(effect.done, ({ params: payload, result }) => {
            const extra = extraParams(`${effect.shortName}_done`, config, { payload, result });
            if (extra !== null) {
                const params: OutputParams = {
                    color: "ok",
                    domain: domain.shortName,
                    shortName: effect.shortName,
                    name: config.named(effect.shortName),
                    kind: "effect.done",
                    extra,
                };
                logGroup(
                    withColors(params, config),
                    { payload, result },
                    config.options[effect.shortName],
                );
            }
        });

        watch(effect.fail, ({ params: payload, error }) => {
            const extra = extraParams(`${effect.shortName}_fail`, config, { payload, error });
            if (extra !== null) {
                const params: OutputParams = {
                    color: "fail",
                    domain: domain.shortName,
                    shortName: effect.shortName,
                    name: config.named(effect.shortName),
                    kind: "effect.fail",
                    extra,
                };
                logGroup(
                    withColors(params, config),
                    { payload, error },
                    config.options[effect.shortName],
                );
            }
        });
    };
}

// log helpers ------------------------------------------------------------------------------------]

const isMapSet = (o: AnyType) => isMap(o) || isSet(o);

const genericStore = (o: AnyType) => (size(o) ? "some data" : "empty");

export const size = (o: AnyType) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return isMapSet(o) ? o.size : isPlainObject(o) ? keys(o).length : o?.length;
};

export const pl = (noun: string, count: number) => `${count} ` + (count === 1 ? noun : `${noun}s`);

export const onOff = (o: AnyType, k?: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return k && !isNil(o) ? `${k} : ${(isPlainObject(o) ? o[k] : o) ? "on" : "off"}` : "unset";
};

export const list = (o: AnyType) =>
    size(o)
        ? `${(isArray(o) ? o : isMapSet(o) ? Array.from(o.keys()) : keys(o)).join(", ")}`
        : "empty";

export const listKey = (o: AnyType, k: string) =>
    size(o) ? `${map(o, (i) => get(i, k, "?")).join(", ")}` : "empty";

type Fn = (p: AnyType, key?: string) => string;
export const updated = (o: AnyType, keys: Record<string, Fn>) => {
    return transform(
        keys,
        (acc, fn, key) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (has(o, key)) acc.push(fn(o[key], key));
        },
        [] as string[],
    ).join(", ");
};

export const uuid = (u: string) => (u ? String(u).slice(0, 8) + "-*" : "*");
