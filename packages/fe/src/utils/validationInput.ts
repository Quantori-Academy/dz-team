import { isNumber, isString } from "lodash";

type ValidationRule = {
    required?: boolean;
    positiveCheck?: boolean;
    integerCheck?: boolean;
    urlCheck?: boolean;
    maxLength?: number;
};

type ValidationRules = Record<string, ValidationRule>;

const isUrlValid = (urlString: string): boolean => {
    try {
        new URL(urlString);
        return true;
    } catch {
        return false;
    }
};

export const validateInput = <T extends Record<string, unknown>>(
    input: T,
    rules: ValidationRules,
): Record<string, string> => {
    const errors: Record<string, string> = {};

    for (const [field, validations] of Object.entries(rules)) {
        const value = input[field];

        if (validations.required && !value) {
            errors[field] = `${field} is required`;
        }

        const numericValue = isNumber(value) ? value : Number(value);

        if (validations.integerCheck && !Number.isInteger(numericValue)) {
            errors[field] = `${field} must be an integer`;
        }
        if (validations.positiveCheck && numericValue <= 0) {
            errors[field] = `${field} must be a positive number`;
        }

        if (validations.urlCheck && isString(value) && !isUrlValid(value)) {
            errors[field] = `${field} must be a valid URL`;
        }
        if (validations.maxLength && isString(value) && value.length > validations.maxLength) {
            errors[field] = `${field} must not exceed ${validations.maxLength} characters`;
        }
    }

    return errors;
};
