import { z } from "zod";

export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

type ValidationResult = {
    success: boolean,
    error?: string,
}

export function validate(input: Validatable): ValidationResult {
    let schema: z.ZodString | z.ZodNumber;

    if (typeof input.value === "string") {
        schema = z.string() as z.ZodString;

        if (input.required) {
            schema = schema.min(1, "Field is required");
        }
        if (input.minLength != null) {
            schema = schema.min(input.minLength, `Must be at least ${input.minLength} chars`);
        }
        if (input.maxLength != null) {
            schema = schema.max(input.maxLength, `Must be at most ${input.maxLength} chars`);
        }

    } else if (typeof input.value === "number") {
        schema = z.number() as z.ZodNumber;

        if (input.required) {
            // Zod для числа і так очікує number, але можна явно додати refine
            schema = schema.refine((val) => val !== undefined, { message: "Required" });
        }
        if (input.min != null) {
            schema = schema.min(input.min, `Must be >= ${input.min}`);
        }
        if (input.max != null) {
            schema = schema.max(input.max, `Must be <= ${input.max}`);
        }
    } else {
        return { success: false, error: "Invalid type" };
    }

    const result = schema.safeParse(input.value);
    return { "success": result.success, "error": result.error?.issues[0].message };
}
