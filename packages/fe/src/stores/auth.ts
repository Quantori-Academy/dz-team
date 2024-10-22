import { genericDomain } from "logger";

import { loginFx } from "./login";

type User = { username: string }; // TODO: update when the interface is known

export const $auth = genericDomain.createStore<User | null>(null);

$auth.on(loginFx.doneData, (_, { username }) => ({ username }));
