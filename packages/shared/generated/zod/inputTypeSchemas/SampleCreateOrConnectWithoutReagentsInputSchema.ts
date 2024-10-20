import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SampleWhereUniqueInputSchema } from "./SampleWhereUniqueInputSchema";
import { SampleCreateWithoutReagentsInputSchema } from "./SampleCreateWithoutReagentsInputSchema";
import { SampleUncheckedCreateWithoutReagentsInputSchema } from "./SampleUncheckedCreateWithoutReagentsInputSchema";

export const SampleCreateOrConnectWithoutReagentsInputSchema: z.ZodType<Prisma.SampleCreateOrConnectWithoutReagentsInput> =
    z
        .object({
            where: z.lazy(() => SampleWhereUniqueInputSchema),
            create: z.union([
                z.lazy(() => SampleCreateWithoutReagentsInputSchema),
                z.lazy(() => SampleUncheckedCreateWithoutReagentsInputSchema),
            ]),
        })
        .strict();

export default SampleCreateOrConnectWithoutReagentsInputSchema;
