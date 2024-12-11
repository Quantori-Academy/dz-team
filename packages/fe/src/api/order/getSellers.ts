import { z } from "zod";

import { request } from "api/request";
import { SellerSchema } from "shared/generated/zod";

export const getSellers = async () => await request("/sellers", z.array(SellerSchema));
