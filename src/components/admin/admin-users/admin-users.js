import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AdminChart from "../admin-chart/admin-chart";
import Button from "../../ui/button";

import { UsersContext } from "../../../store/users-context";

export default function AdminUsers() {
    const { users } = useContext(UsersContext);

    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <h1 className="admin-title">Users</h1>

            <AdminChart type="users" data={users} />

            <div className="admin-container-actions">
                <Button text="Back to Dashboard" onClick={() => navigate('/admin')} />
            </div>
        </div>
    );
}