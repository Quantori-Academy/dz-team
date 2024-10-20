import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { SampleCountOutputTypeSelectSchema } from "./SampleCountOutputTypeSelectSchema";

export const SampleCountOutputTypeArgsSchema: z.ZodType<Prisma.SampleCountOutputTypeDefaultArgs> = z
    .object({
        select: z.lazy(() => SampleCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export default SampleCountOutputTypeSelectSchema;
