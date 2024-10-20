import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SortOrderSchema } from "./SortOrderSchema";
import { UserCountOrderByAggregateInputSchema } from "./UserCountOrderByAggregateInputSchema";
import { UserMaxOrderByAggregateInputSchema } from "./UserMaxOrderByAggregateInputSchema";
import { UserMinOrderByAggregateInputSchema } from "./UserMinOrderByAggregateInputSchema";

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
    z
        .object({
            id: z.lazy(() => SortOrderSchema).optional(),
            username: z.lazy(() => SortOrderSchema).optional(),
            firstName: z.lazy(() => SortOrderSchema).optional(),
            lastName: z.lazy(() => SortOrderSchema).optional(),
            email: z.lazy(() => SortOrderSchema).optional(),
            password: z.lazy(() => SortOrderSchema).optional(),
            role: z.lazy(() => SortOrderSchema).optional(),
            createdAt: z.lazy(() => SortOrderSchema).optional(),
            updatedAt: z.lazy(() => SortOrderSchema).optional(),
            _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
            _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
            _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
        })
        .strict();

export default UserOrderByWithAggregationInputSchema;
