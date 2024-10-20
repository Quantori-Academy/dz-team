import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleWhereInputSchema } from "../inputTypeSchemas/SampleWhereInputSchema";

export const SampleDeleteManyArgsSchema: z.ZodType<Prisma.SampleDeleteManyArgs> = z
    .object({
        where: SampleWhereInputSchema.optional(),
    })
    .strict();

export default SampleDeleteManyArgsSchema;
