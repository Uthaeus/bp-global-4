import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { UsersContext } from "../../../store/users-context";

import AdminOrderForm from "./admin-order-form";

export default function AdminNewOrder() {

    const { users } = useContext(UsersContext);
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const u = users.find((user) => user.id === id);
        setUser(u);
    }, [users, id]);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Create New Order</h1>

            <AdminOrderForm user={user} />

            <div className="admin-container-actions">
                <Link to='/admin' className="btn btn-primary mx-2">Back to Dashboard</Link>
                <Link to="/admin/orders" className="btn btn-secondary mx-2">Back to Orders</Link>
            </div>
        </div>
    );
}