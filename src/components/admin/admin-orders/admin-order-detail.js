import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { OrdersContext } from "../../../store/orders-context";

export default function AdminOrderDetail() {
    const { id } = useParams();
    const { orders } = useContext(OrdersContext);
    const [order, setOrder] = useState({});

    useEffect(() => {
        const order = orders.find((order) => +order.id === +id);
        setOrder(order);
    }, [orders, id]);

    return (
        <div className="admin-order-detail">
            <div className="admin-order-detail-header">
                <div className="admin-order-detail-header-left">
                    <p className="admin-order-detail-header-item">Order Number: <span className="mx-2">{order.order_number}</span></p>
                </div>
                <div className="admin-order-detail-header-right">
                    <p className="admin-order-detail-header-item">Customer: <span className="mx-2">{order.customer_name}</span></p>

                    <p className="admin-order-detail-header-order-date">Order Date: <span className="mx-2">{order.created_at}</span></p>
                </div>
            </div>

            <div className="admin-order-detail-body">
                <div className="dummy-image" />
                <div className="dummy-image" />
                <div className="dummy-image" />
            </div>

            <div className="admin-order-detail-actions">
                <button className="btn btn-danger mx-3">Delete Order</button>

                <Link to={`/admin/orders/${id}/edit`} className="btn btn-info mx-3">Edit Order</Link>

                <Link to="/admin/orders" className="btn btn-primary mx-3">Back</Link>

            </div>
            
        </div>
    );
}