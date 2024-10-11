export type SupportedValue =
    | string
    | number
    | boolean
    | null
    | Date
    | bigint
    | string[]
    | { [key: string]: SupportedValue };

export const formatCellContent = (key: string, value: SupportedValue): string => {
    switch (typeof value) {
        case "boolean":
            return value ? "Yes" : "No";
        case "object":
            if (value === null) {
                return "N/A";
            }
            if (Array.isArray(value)) {
                return value.join(", ");
            }
            if (value instanceof Date) {
                return formatDate(value);
            }
            return formatObject(value);
        case "bigint":
        case "number":
            return value.toString();
        default:
            return value.toString();
    }
};

const formatObject = (obj: Record<string, SupportedValue>): string => {
    return Object.entries(obj)
        .map(([key, val]) => `${key}: ${formatCellContent(key, val)}`)
        .join(", ");
};

const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
