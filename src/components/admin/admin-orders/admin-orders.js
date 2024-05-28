import { useContext } from "react";
import { useNavigate } from "react-router";

import { OrdersContext } from "../../../store/orders-context";
import AdminChart from "../admin-chart/admin-chart";
import Button from "../../ui/button";

export default function AdminOrders() {
    const { orders } = useContext(OrdersContext);

    const navigate = useNavigate();
    
    return (
        <div className="admin-container">
            <h1 className="admin-title">Orders</h1>

            <AdminChart type="orders" data={orders} />

            <div className="admin-container-actions">
                <Button text="Back to Dashboard" onClick={() => navigate('/admin')} />
            </div>
        </div>
    );
}