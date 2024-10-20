import type { Prisma } from "@prisma/client";

import { z } from "zod";
import { SampleCreateWithoutReagentsInputSchema } from "./SampleCreateWithoutReagentsInputSchema";
import { SampleUncheckedCreateWithoutReagentsInputSchema } from "./SampleUncheckedCreateWithoutReagentsInputSchema";
import { SampleCreateOrConnectWithoutReagentsInputSchema } from "./SampleCreateOrConnectWithoutReagentsInputSchema";
import { SampleUpsertWithWhereUniqueWithoutReagentsInputSchema } from "./SampleUpsertWithWhereUniqueWithoutReagentsInputSchema";
import { SampleWhereUniqueInputSchema } from "./SampleWhereUniqueInputSchema";
import { SampleUpdateWithWhereUniqueWithoutReagentsInputSchema } from "./SampleUpdateWithWhereUniqueWithoutReagentsInputSchema";
import { SampleUpdateManyWithWhereWithoutReagentsInputSchema } from "./SampleUpdateManyWithWhereWithoutReagentsInputSchema";
import { SampleScalarWhereInputSchema } from "./SampleScalarWhereInputSchema";

export const SampleUncheckedUpdateManyWithoutReagentsNestedInputSchema: z.ZodType<Prisma.SampleUncheckedUpdateManyWithoutReagentsNestedInput> =
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
            upsert: z
                .union([
                    z.lazy(() => SampleUpsertWithWhereUniqueWithoutReagentsInputSchema),
                    z.lazy(() => SampleUpsertWithWhereUniqueWithoutReagentsInputSchema).array(),
                ])
                .optional(),
            set: z
                .union([
                    z.lazy(() => SampleWhereUniqueInputSchema),
                    z.lazy(() => SampleWhereUniqueInputSchema).array(),
                ])
                .optional(),
            disconnect: z
                .union([
                    z.lazy(() => SampleWhereUniqueInputSchema),
                    z.lazy(() => SampleWhereUniqueInputSchema).array(),
                ])
                .optional(),
            delete: z
                .union([
                    z.lazy(() => SampleWhereUniqueInputSchema),
                    z.lazy(() => SampleWhereUniqueInputSchema).array(),
                ])
                .optional(),
            connect: z
                .union([
                    z.lazy(() => SampleWhereUniqueInputSchema),
                    z.lazy(() => SampleWhereUniqueInputSchema).array(),
                ])
                .optional(),
            update: z
                .union([
                    z.lazy(() => SampleUpdateWithWhereUniqueWithoutReagentsInputSchema),
                    z.lazy(() => SampleUpdateWithWhereUniqueWithoutReagentsInputSchema).array(),
                ])
                .optional(),
            updateMany: z
                .union([
                    z.lazy(() => SampleUpdateManyWithWhereWithoutReagentsInputSchema),
                    z.lazy(() => SampleUpdateManyWithWhereWithoutReagentsInputSchema).array(),
                ])
                .optional(),
            deleteMany: z
                .union([
                    z.lazy(() => SampleScalarWhereInputSchema),
                    z.lazy(() => SampleScalarWhereInputSchema).array(),
                ])
                .optional(),
        })
        .strict();

export default SampleUncheckedUpdateManyWithoutReagentsNestedInputSchema;
