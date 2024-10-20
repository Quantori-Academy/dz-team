import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleUpdateManyMutationInputSchema } from "../inputTypeSchemas/SampleUpdateManyMutationInputSchema";
import { SampleUncheckedUpdateManyInputSchema } from "../inputTypeSchemas/SampleUncheckedUpdateManyInputSchema";
import { SampleWhereInputSchema } from "../inputTypeSchemas/SampleWhereInputSchema";

export const SampleUpdateManyArgsSchema: z.ZodType<Prisma.SampleUpdateManyArgs> = z
    .object({
        data: z.union([SampleUpdateManyMutationInputSchema, SampleUncheckedUpdateManyInputSchema]),
        where: SampleWhereInputSchema.optional(),
    })
    .strict();

export default SampleUpdateManyArgsSchema;
