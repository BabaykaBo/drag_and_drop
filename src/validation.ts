export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(input: Validatable): boolean {
    const valueLength = input.value.toString().trim().length;
    if (input.required && valueLength === 0) {
        return false;
    }

    if (typeof input.value === 'string') {
        if (input.minLength != null && valueLength < input.minLength) {
            return false;
        }

        if (input.maxLength != null && valueLength > input.maxLength) {
            return false;
        }
    } else if (typeof input.value === 'number') {
        if (input.min != null && input.value < input.min) {
            return false;
        }

        if (input.max != null && input.value > input.max) {
            return false;
        }
    }

    return true;
}