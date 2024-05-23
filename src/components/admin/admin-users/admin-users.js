import { useContext } from "react";

import { UsersContext } from "../../../store/users-context";

export default function AdminUsers() {
    const { users } = useContext(UsersContext);
    return (
        <div className="admin-users">
            <h1 className="admin-users-title">Users</h1>

            {users.map((user) => (
                <div className="admin-user" key={user.id}>
                    <p className="admin-user-name">{user.name}</p>
                    <p className="admin-user-email">{user.email}</p>
                </div>
            ))}
        </div>
    );
}