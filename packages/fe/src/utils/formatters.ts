export type SupportedValue =
    | string
    | number
    | boolean
    | null
    | Date
    | bigint
    | string[]
    | { [key: string]: SupportedValue };
