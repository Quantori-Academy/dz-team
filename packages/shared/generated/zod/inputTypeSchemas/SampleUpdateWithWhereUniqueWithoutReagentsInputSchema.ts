import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SampleWhereUniqueInputSchema } from "./SampleWhereUniqueInputSchema";
import { SampleUpdateWithoutReagentsInputSchema } from "./SampleUpdateWithoutReagentsInputSchema";
import { SampleUncheckedUpdateWithoutReagentsInputSchema } from "./SampleUncheckedUpdateWithoutReagentsInputSchema";

export const SampleUpdateWithWhereUniqueWithoutReagentsInputSchema: z.ZodType<Prisma.SampleUpdateWithWhereUniqueWithoutReagentsInput> =
    z
        .object({
            where: z.lazy(() => SampleWhereUniqueInputSchema),
            data: z.union([
                z.lazy(() => SampleUpdateWithoutReagentsInputSchema),
                z.lazy(() => SampleUncheckedUpdateWithoutReagentsInputSchema),
            ]),
        })
        .strict();

export default SampleUpdateWithWhereUniqueWithoutReagentsInputSchema;
