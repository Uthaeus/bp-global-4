import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { UserContext } from "../store/user-context";
import Button from "../components/ui/button";

export default function AccountEdit() {
    const { user, updateUser } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const onSubmit = async (data) => {

        try {
            updateUser(data);
        } catch (error) {
            console.log('update user error: ', error);
        } finally {
            navigate('/account');
        }
    }

    return (
        <div className="account-edit">
            <h1 className="account-edit-title">Edit Account</h1>

            <form className="account-edit-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" {...register("name", { required: true })} />
                    {errors.name && <p className="text-danger">Name is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" {...register("email", { required: true })} />
                    {errors.email && <p className="text-danger">Email is required</p>}
                </div>

                <div className="form-group mb-5">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Leave blank to keep the same" {...register("password")} />
                </div>

                <Button text="Update Account" />
            </form>

            <div className="account-edit-actions">
                <Button text="Delete Account" className="delete-button mx-2" />
                <Button text="Back to Account" className="secondary-button mx-2" onClick={() => navigate('/account')} />
                <Button text="Back to Home" className="mx-2" onClick={() => navigate('/')} />
            </div>
        </div>
    )
}