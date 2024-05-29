import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../ui/button";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="auth">
      <h1 className="auth-title">Register</h1>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            autoFocus={true}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">Email is required</span>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">Password is required</span>
          )}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <span className="text-danger">Confirm Password is required</span>
          )}
        </div>

        <Button text="Register" className="mb-4" />

        <p className="auth-form-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
