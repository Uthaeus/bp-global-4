import { Link } from "react-router-dom";

import AdminUserForm from "./admin-user-form";

export default function AdminNewUser() {

    return (
        <div className="admin-container">
            <h1 className="admin-title">Create New User</h1>

            <AdminUserForm />

            <div className="admin-container-actions">
                <Link to='/admin' className="btn btn-primary">Back</Link>
            </div>
        </div>
    )
}