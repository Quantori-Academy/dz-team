import { useState } from "react";

import { User, userSchema } from "shared/zod-schemas";

const BASE_URL = "http://0.0.0.1:1337";

export const LoginForm = () => {
    const [formData, setFormData] = useState<User>({ email: "", password: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validatedUser = userSchema.safeParse(formData);
        // eslint-disable-next-line no-console
        console.log("user validation result:", validatedUser);
        if (validatedUser.success) {
            fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedUser.data),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // eslint-disable-next-line no-console
                    console.log(data);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                });
        } else {
            // eslint-disable-next-line no-console
            console.log("Please enter valid user credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
            />
            <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};
