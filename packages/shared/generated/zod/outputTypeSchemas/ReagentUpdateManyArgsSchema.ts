import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { ReagentUpdateManyMutationInputSchema } from "../inputTypeSchemas/ReagentUpdateManyMutationInputSchema";
import { ReagentUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/ReagentUncheckedUpdateManyInputSchema";
import { ReagentWhereInputSchema } from "../inputTypeSchemas/ReagentWhereInputSchema";

export const ReagentUpdateManyArgsSchema: z.ZodType<Prisma.ReagentUpdateManyArgs> = z
    .object({
        data: z.union([
            ReagentUpdateManyMutationInputSchema,
            ReagentUncheckedUpdateManyInputSchema,
        ]),
        where: ReagentWhereInputSchema.optional(),
    })
    .strict();

export default ReagentUpdateManyArgsSchema;
