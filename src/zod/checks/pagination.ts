import { z } from 'zod';

const OrderDirectionSchema = z.enum(['ASC', 'DESC'], {
    errorMap: () => ({ message: 'Order direction must be either ASC or DESC' })
});

const OrderSchema = z.object({
    field: z
        .string()
        .min(3, { message: 'Order field must be at least 3 characters' }),
    direction: OrderDirectionSchema
});

const base64CursorRegex = /^[A-Za-z0-9+/]+={0,2}$/;

export const PageInputSchema = z
    .object({
        first: z
            .number()
            .int({ message: 'First must be an integer' })
            .gt(0, { message: 'First must be greater than 0' })
            .optional(),

        last: z
            .number()
            .int({ message: 'Last must be an integer' })
            .gt(0, { message: 'Last must be greater than 0' })
            .optional(),

        after: z
            .string()
            .regex(base64CursorRegex, {
                message: 'After cursor has invalid format'
            })
            .optional(),

        before: z
            .string()
            .regex(base64CursorRegex, {
                message: 'Before cursor has invalid format'
            })
            .optional(),

        order: z
            .array(OrderSchema, {
                invalid_type_error: 'Order must be an array of order objects'
            })
            .optional()
    })
    .refine((data) => !(data.first !== undefined && data.last !== undefined), {
        message: 'Cannot use both first and last parameters together'
    })
    .refine(
        (data) => !(data.after !== undefined && data.before !== undefined),
        {
            message: 'Cannot use both after and before cursors together'
        }
    );
