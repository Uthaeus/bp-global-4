import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import { UsersContext } from "../../../store/users-context";

import AdminUserForm from "./admin-user-form";

export default function AdminEditUser() {
    const { id } = useParams();
    const { users } = useContext(UsersContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = users.find((user) => user.id === id);
        setUser(user);
    }, [users, id]);

    return (
        <div className="admin-edit-user">
            <h1 className="admin-edit-user-title">Edit User</h1>
            <AdminUserForm user={user} />
        </div>
    )
}

