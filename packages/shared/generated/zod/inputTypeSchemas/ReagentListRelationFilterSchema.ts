import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { ReagentWhereInputSchema } from "./ReagentWhereInputSchema";

export const ReagentListRelationFilterSchema: z.ZodType<Prisma.ReagentListRelationFilter> = z
    .object({
        every: z.lazy(() => ReagentWhereInputSchema).optional(),
        some: z.lazy(() => ReagentWhereInputSchema).optional(),
        none: z.lazy(() => ReagentWhereInputSchema).optional(),
    })
    .strict();

export default ReagentListRelationFilterSchema;
