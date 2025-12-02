import type { PageInput } from '../../../zod/types/pagination';

export const encodeCursor = {
    encode: (offset: number, nodeId?: string | number) =>
        Buffer.from(
            JSON.stringify({
                offset,
                timestamp: Date.now(),
                ...(nodeId !== undefined && { id: nodeId })
            })
        ).toString('base64url'),

    decode: (cursor: string): number => {
        try {
            const parsed = JSON.parse(
                Buffer.from(cursor, 'base64url').toString()
            );
            const { offset } = parsed;
            if (!Number.isInteger(offset) || offset < 0) throw new Error();
            return offset;
        } catch {
            throw new Error(`Invalid cursor: ${cursor}`);
        }
    }
};

export const resolvePagination = ({
    page,
    totalCount
}: {
    page: PageInput;
    totalCount: number;
}) => {
    const { first, last, after, before } = page ?? {};

    // Decode cursors if provided
    const afterOffset = after ? encodeCursor.decode(after) : null;
    const beforeOffset = before ? encodeCursor.decode(before) : null;

    // Determine slice start and end
    let start = afterOffset !== null ? afterOffset + 1 : 0;
    let end = beforeOffset !== null ? beforeOffset : totalCount;

    // Adjust for first/last pagination
    if (first !== undefined) end = Math.min(start + first, end);
    if (last !== undefined) start = Math.max(end - last, start);

    // Calculate limit for DB query
    const limit = Math.max(end - start, 0);

    return { start, limit };
};
