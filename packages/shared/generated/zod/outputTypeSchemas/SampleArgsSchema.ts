import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleSelectSchema } from "../inputTypeSchemas/SampleSelectSchema";
import { SampleIncludeSchema } from "../inputTypeSchemas/SampleIncludeSchema";

export const SampleArgsSchema: z.ZodType<Prisma.SampleDefaultArgs> = z
    .object({
        select: z.lazy(() => SampleSelectSchema).optional(),
        include: z.lazy(() => SampleIncludeSchema).optional(),
    })
    .strict();

export default SampleArgsSchema;
