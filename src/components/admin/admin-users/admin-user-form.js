import { useForm } from "react-hook-form";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";

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
                const updatedUser = {
                    ...user,
                    ...data,
                    updated_at: formattedDate
                }
                await updateUser(updatedUser);
                await updateProfile(auth.currentUser, {
                    displayName: data.name,
                    email: data.email
                })
                console.log('updating user', updatedUser);
            } else {
                const newUser = {
                    ...data,
                    created_at: formattedDate,
                    role: 'user'
                }
                await addUser(newUser);
                console.log('adding user', newUser);
            }

            navigate('/admin/users');
        } catch (error) {
            console.log('user form submit error',error);
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

            <Button text={ user ? "Update User" : "Create User" } />
        </form>
    )
}