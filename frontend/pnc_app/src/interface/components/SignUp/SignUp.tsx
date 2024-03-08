import React from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../../../data/services/authService";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerService(data); // This calls your backend to register the user
      navigate("/mainpage"); // Adjust this to your main page's route
    } catch (error) {
      console.error("Registration error:", error);
      // Handle errors, e.g., show an error message to the user
    }
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <span>Create your account</span>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name", { required: true })} />
          {errors.name && <p>Name is required.</p>}
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input id="username" {...register("username", { required: true })} />
          {errors.username && <p>Username is required.</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email", { required: true })} />
          {errors.email && <p>Email is required.</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p>Password is required and must be at least 8 characters long.</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </Box>
  );
};
export default SignUp;
