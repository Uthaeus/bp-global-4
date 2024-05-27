import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router";

import { UserContext } from "../store/user-context";

export default function AccountEdit() {
    const { user } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const navigate = useNavigate();

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="account-edit">
            <h1 className="account-edit-title">Edit Account</h1>

            <form className="account-edit-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" {...register("name", { required: true })} />
                    {errors.name && <p className="text-danger">Name is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email", { required: true })} />
                    {errors.email && <p className="text-danger">Email is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Leave blank to keep the same" {...register("password")} />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>

            <div className="account-edit-actions">
                <Link to="/account" className="btn btn-success mx-2">Back to Account</Link>
                <Link to='/' className="btn btn-primary mx-2">Back to Home</Link>
            </div>
        </div>
    )
}