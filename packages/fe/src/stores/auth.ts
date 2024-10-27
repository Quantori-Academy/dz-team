import { genericDomain } from "logger";

import { loginFx } from "./login";

export type Auth = { token: string };

export const $auth = genericDomain.createStore<Auth | null>(null);

$auth.on(loginFx.done, (_, { result }) => ({ token: result.token }));
