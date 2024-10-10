export type SupportedValue =
    | string
    | number
    | boolean
    | null
    | Date
    | bigint
    | string[]
    | { [key: string]: SupportedValue };

export const formatCellContent = (value: SupportedValue) => {
    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }
    if (Array.isArray(value)) {
        return value.join(", ");
    }
    if (value === null) {
        return "N/A";
    }
    if (value instanceof Date) {
        return formatDate(value);
    }
    if (typeof value === "bigint") {
        return value.toString();
    }
    if (typeof value === "object") {
        return formatObject(value);
    }
    return value;
};

const formatObject = (obj: Record<string, SupportedValue>): string => {
    return Object.entries(obj)
        .map(([key, val]) => `${key}: ${formatCellContent(val)}`)
        .join(", ");
};

const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
