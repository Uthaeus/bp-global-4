import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function AdminUserForm({ user }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <form className="admin-user-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" {...register("name", { required: true })} />
                {errors.name && <span className="text-danger">Name is required</span>}
            </div>

            <div className="form-group mb-4">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" {...register("email", { required: true })} />
                {errors.email && <span className="text-danger">Email is required</span>}
            </div>

            <button type="submit" className="admin-user-form-btn mb-4">{ user ? "Update User" : "Create User"}</button>
        </form>
    )
}