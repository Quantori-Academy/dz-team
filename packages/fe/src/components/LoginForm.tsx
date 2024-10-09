import { useState } from "react";
import {userSchema, User} from "../../../shared/zod-schemas";

const BASE_URL = "http://0.0.0.1:1337";

function LoginForm() {
  const [formData, setFormData] = useState<User>({email: "", password: ""});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validatedUser = userSchema.safeParse(formData);
    
    console.log("user validation result:", validatedUser);
    
    if(validatedUser.success) {
      try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(validatedUser.data),
        });
        const result = await response.json();
        console.log(result);
      } catch(err) {
        console.log("request error:", err);
      }
    } else {
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

export default LoginForm;