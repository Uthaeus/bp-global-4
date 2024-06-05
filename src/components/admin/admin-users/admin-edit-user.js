import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UsersContext } from "../../../store/users-context";

import AdminUserForm from "./admin-user-form";
import Button from "../../ui/button";

export default function AdminEditUser() {
    const { id } = useParams();
    const { users, deleteUser } = useContext(UsersContext);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = users.find((user) => user.id.toString() === id.toString());
        setUser(user);
    }, [users, id]);

    const deleteUserHandler = async () => {
        await deleteUser(id);
        navigate('/admin/users');
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Edit User</h1>
            <AdminUserForm user={user} />

            <div className="admin-container-actions">
                <Button text="Delete User" className='delete-button mx-2' onClick={deleteUserHandler} />
                <Button text="Back to Users" className='secondary-button mx-2' onClick={() => navigate('/admin/users')} />
                <Button text="Back to Dashboard" className='mx-2' onClick={() => navigate('/admin')} />
            </div>
        </div>
    )
}

