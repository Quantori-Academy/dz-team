import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentWhereInputSchema } from "../inputTypeSchemas/ReagentWhereInputSchema";

export const ReagentDeleteManyArgsSchema: z.ZodType<Prisma.ReagentDeleteManyArgs> = z
    .object({
        where: ReagentWhereInputSchema.optional(),
    })
    .strict();

export default ReagentDeleteManyArgsSchema;
