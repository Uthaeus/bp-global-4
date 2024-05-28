import { useNavigate } from "react-router-dom"

import Button from "../ui/button";

export default function AdminHome() {

    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Home</h1>
            <p className="w-75 d-flex justify-content-end">
                <Button text="Create New User" onClick={() => navigate('/admin/user/new')} />
            </p>
        </div>
    )
}