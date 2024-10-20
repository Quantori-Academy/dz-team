import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SampleWhereUniqueInputSchema } from "./SampleWhereUniqueInputSchema";
import { SampleUpdateWithoutReagentsInputSchema } from "./SampleUpdateWithoutReagentsInputSchema";
import { SampleUncheckedUpdateWithoutReagentsInputSchema } from "./SampleUncheckedUpdateWithoutReagentsInputSchema";
import { SampleCreateWithoutReagentsInputSchema } from "./SampleCreateWithoutReagentsInputSchema";
import { SampleUncheckedCreateWithoutReagentsInputSchema } from "./SampleUncheckedCreateWithoutReagentsInputSchema";

export const SampleUpsertWithWhereUniqueWithoutReagentsInputSchema: z.ZodType<Prisma.SampleUpsertWithWhereUniqueWithoutReagentsInput> =
    z
        .object({
            where: z.lazy(() => SampleWhereUniqueInputSchema),
            update: z.union([
                z.lazy(() => SampleUpdateWithoutReagentsInputSchema),
                z.lazy(() => SampleUncheckedUpdateWithoutReagentsInputSchema),
            ]),
            create: z.union([
                z.lazy(() => SampleCreateWithoutReagentsInputSchema),
                z.lazy(() => SampleUncheckedCreateWithoutReagentsInputSchema),
            ]),
        })
        .strict();

export default SampleUpsertWithWhereUniqueWithoutReagentsInputSchema;
