import { useContext } from "react";

import { OrdersContext } from "../../../store/orders-context";
import AdminChart from "../admin-chart/admin-chart";

export default function AdminOrders() {
    const { orders } = useContext(OrdersContext);
    
    return (
        <div className="admin-container">
            <h1 className="admin-title">Orders</h1>

            <AdminChart type="orders" data={orders} />
        </div>
    );
}