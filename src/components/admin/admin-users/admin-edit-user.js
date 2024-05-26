import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UsersContext } from "../../../store/users-context";

import AdminUserForm from "./admin-user-form";

export default function AdminEditUser() {
    const { id } = useParams();
    const { users } = useContext(UsersContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = users.find((user) => user.id.toString() === id.toString());
        setUser(user);
    }, [users, id]);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Edit User</h1>
            <AdminUserForm user={user} />

            <div className="admin-container-actions">
                <button className="btn btn-danger mx-2">Delete User</button>
                <Link to='/admin/users' className="btn btn-success mx-2">Back to Users</Link>
                <Link to='/admin' className="btn btn-primary mx-2">Back to Dashboard</Link>
            </div>
        </div>
    )
}

