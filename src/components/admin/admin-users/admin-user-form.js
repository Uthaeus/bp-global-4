import { useForm } from "react-hook-form";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { UsersContext } from "../../../store/users-context";
import Button from "../../ui/button";

export default function AdminUserForm({ user }) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { addUser, updateUser } = useContext(UsersContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        console.log('user form submit', data);
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        try {

            if (user) {
                data.updated_at = formattedDate;
                updateUser(data);
                console.log('updating user', data);
            } else {
                data.id = Math.random().toString(36).substring(2, 9);
                data.created_at = formattedDate;
                addUser(data);
                console.log('adding user', data);
            }
        } catch (error) {
            console.log('user form submit error',error);
        } finally {
            navigate('/admin/users');
        }
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

            {/* <button type="submit" className="admin-user-form-btn mb-4">{ user ? "Update User" : "Create User"}</button> */}
            <Button text={ user ? "Update User" : "Create User" } />
        </form>
    )
}