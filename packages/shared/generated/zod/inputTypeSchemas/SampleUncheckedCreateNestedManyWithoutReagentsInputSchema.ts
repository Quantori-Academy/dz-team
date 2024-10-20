import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SampleCreateWithoutReagentsInputSchema } from "./SampleCreateWithoutReagentsInputSchema";
import { SampleUncheckedCreateWithoutReagentsInputSchema } from "./SampleUncheckedCreateWithoutReagentsInputSchema";
import { SampleCreateOrConnectWithoutReagentsInputSchema } from "./SampleCreateOrConnectWithoutReagentsInputSchema";
import { SampleWhereUniqueInputSchema } from "./SampleWhereUniqueInputSchema";

export const SampleUncheckedCreateNestedManyWithoutReagentsInputSchema: z.ZodType<Prisma.SampleUncheckedCreateNestedManyWithoutReagentsInput> =
    z
        .object({
            create: z
                .union([
                    z.lazy(() => SampleCreateWithoutReagentsInputSchema),
                    z.lazy(() => SampleCreateWithoutReagentsInputSchema).array(),
                    z.lazy(() => SampleUncheckedCreateWithoutReagentsInputSchema),
                    z.lazy(() => SampleUncheckedCreateWithoutReagentsInputSchema).array(),
                ])
                .optional(),
            connectOrCreate: z
                .union([
                    z.lazy(() => SampleCreateOrConnectWithoutReagentsInputSchema),
                    z.lazy(() => SampleCreateOrConnectWithoutReagentsInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => SampleWhereUniqueInputSchema),
                    z.lazy(() => SampleWhereUniqueInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export default SampleUncheckedCreateNestedManyWithoutReagentsInputSchema;
