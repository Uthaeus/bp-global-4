import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { OrdersContext } from "../../../store/orders-context";

import AdminOrderForm from "./admin-order-form";

export default function AdminEditOrder() {

    const { id } = useParams();
    const { orders } = useContext(OrdersContext);
    const [order, setOrder] = useState({});

    useEffect(() => {
        const order = orders.find((order) => +order.id === +id);
        
        setOrder(order);
    }, [orders, id]);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Edit Order</h1>

            <AdminOrderForm order={order} />

            <div className="admin-container-actions">
                <button className="btn btn-danger mx-2">Delete Order</button>
                <Link to='/admin' className="btn btn-primary mx-2">Back to Dashboard</Link>
                <Link to="/admin/orders" className="btn btn-secondary mx-2">Back to Orders</Link>
            </div>
        </div>
    );
}