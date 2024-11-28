import { getLoginApi } from "api/login";
import { genericDomain } from "logger";

export const loginFx = genericDomain.createEffect(
    async ({ username, password }: { username: string; password: string }) => {
        try {
            const response = await getLoginApi({ username, password });

            if (response) {
                return { token: response.token };
            }
            throw new Error("An unexpected error occurred. Please, try again or contact support.");
        } catch (err) {
            if (err instanceof Error) {
                dev.error(err.message, err.stack);
                throw err;
            }
            throw new Error("An unexpected error occurred. Please, try again or contact support.");
        }
    },
);

export const $loginState = genericDomain
    .createStore<{ errorMessage: string | null }>({ errorMessage: null })
    .on(loginFx.done, () => ({ errorMessage: null }))
    .on(loginFx.fail, (_, { error }) => ({ errorMessage: error.message }));
