import { Link } from "react-router-dom";

import AdminOrderForm from "./admin-order-form";

export default function AdminNewOrder() {

    return (
        <div className="admin-container">
            <h1 className="admin-title">Create New Order</h1>

            <AdminOrderForm />

            <div className="admin-container-actions">
                <Link to='/admin' className="btn btn-primary mx-2">Back to Dashboard</Link>
                <Link to="/admin/orders" className="btn btn-secondary mx-2">Back to Orders</Link>
            </div>
        </div>
    );
}