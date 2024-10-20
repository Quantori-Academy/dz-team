import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SampleScalarWhereInputSchema } from "./SampleScalarWhereInputSchema";
import { SampleUpdateManyMutationInputSchema } from "./SampleUpdateManyMutationInputSchema";
import { SampleUncheckedUpdateManyWithoutReagentsInputSchema } from "./SampleUncheckedUpdateManyWithoutReagentsInputSchema";

export const SampleUpdateManyWithWhereWithoutReagentsInputSchema: z.ZodType<Prisma.SampleUpdateManyWithWhereWithoutReagentsInput> =
    z
        .object({
            where: z.lazy(() => SampleScalarWhereInputSchema),
            data: z.union([
                z.lazy(() => SampleUpdateManyMutationInputSchema),
                z.lazy(() => SampleUncheckedUpdateManyWithoutReagentsInputSchema),
            ]),
        })
        .strict();

export default SampleUpdateManyWithWhereWithoutReagentsInputSchema;
