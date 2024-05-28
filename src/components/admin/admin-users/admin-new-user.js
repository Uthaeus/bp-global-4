import { useNavigate } from "react-router-dom";

import AdminUserForm from "./admin-user-form";
import Button from "../../ui/button";

export default function AdminNewUser() {

    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <h1 className="admin-title">Create New User</h1>

            <AdminUserForm />

            <div className="admin-container-actions">
                <Button text="Back to Dashboard" onClick={() => navigate('/admin')} />
            </div>
        </div>
    )
}