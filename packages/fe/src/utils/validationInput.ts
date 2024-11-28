type ValidationRule = {
    required?: boolean;
    negativeCheck?: boolean;
    integerCheck?: boolean;
    urlCheck?: boolean;
};

type ValidationRules = {
    [key: string]: ValidationRule;
};

const isUrlValid = (urlString: string): boolean => {
    try {
        new URL(urlString);
        return true;
    } catch {
        return false;
    }
};

export const validateInput = <T>(
    input: T,
    rules: ValidationRules,
): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};

    for (const [field, validations] of Object.entries(rules)) {
        const value = input[field as keyof T];

        if (validations.required && !value) {
            errors[field as keyof T] = `${field} is required`;
        }

        if (validations.negativeCheck && typeof value === "number" && value < 0) {
            errors[field as keyof T] = `${field} cannot be negative`;
        }
        if (validations.integerCheck) {
            const numericValue = typeof value === "string" ? Number(value) : value;
            if (typeof numericValue !== "number" || !Number.isInteger(numericValue)) {
                errors[field as keyof T] = `${field} must be an integer`;
            }
        }
        if (validations.urlCheck && typeof value === "string" && !isUrlValid(value)) {
            errors[field as keyof T] = `${field} must be a valid URL`;
        }
    }

    return errors;
};
