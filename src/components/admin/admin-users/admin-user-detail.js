import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { UsersContext } from "../../../store/users-context";

export default function AdminUserDetail() {

    const { id } = useParams();
    const { users } = useContext(UsersContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = users.find((user) => +user.id === +id);
        setUser(user);
    }, [users, id]);

    return (
        <div className="admin-user-detail">
            <h1 className="admin-user-detail-title">{user?.name}</h1>
            <p className="admin-user-detail-email">{user?.email}</p>

            <Link to={`/admin/user/${id}/edit`}>Edit User</Link>
        </div>
    );
}