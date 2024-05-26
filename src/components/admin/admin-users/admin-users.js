import { useContext } from "react";
import { Link } from "react-router-dom";

import AdminChart from "../admin-chart/admin-chart";

import { UsersContext } from "../../../store/users-context";

export default function AdminUsers() {
    const { users } = useContext(UsersContext);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Users</h1>

            <AdminChart type="users" data={users} />

            <div className="admin-container-actions">
                <Link to='/admin' className="btn btn-primary">Back to Dashboard</Link>
            </div>
        </div>
    );
}