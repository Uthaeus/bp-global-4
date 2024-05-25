import { Link } from "react-router-dom"

export default function AdminHome() {
    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Home</h1>
            <p className="w-75 d-flex justify-content-end">
                <Link to='/admin/user/new' className="btn btn-primary">Create New User</Link>
            </p>
        </div>
    )
}