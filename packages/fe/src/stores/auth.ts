import { sample } from "effector";

import { genericDomain } from "logger";

import { loginFx } from "./login";
import { getUserFx } from "./self";

export type Auth = { token: string };

export const $auth = genericDomain.createStore<Auth | null>(null);

$auth.on(loginFx.done, (_, { result }) => ({ token: result.token }));

sample({
    clock: $auth.updates,
    source: $auth,
    filter: Boolean,
    fn: (auth) => auth.token,
    target: getUserFx,
});
