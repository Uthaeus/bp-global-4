import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="auth">
            <h1 className="auth-title">Register</h1>

            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email", { required: true })} />
                    {errors.email && <span className="text-danger">Email is required</span>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register("password", { required: true })} />
                    {errors.password && <span className="text-danger">Password is required</span>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" {...register("confirmPassword", { required: true })} />
                    {errors.confirmPassword && <span className="text-danger">Confirm Password is required</span>}
                </div>

                <button type="submit" className="auth-btn">Register</button>
            </form>
        </div>
    )
}