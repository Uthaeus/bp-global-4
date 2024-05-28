import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { OrdersContext } from "../../../store/orders-context";
import Button from "../../ui/button";

import AdminOrderForm from "./admin-order-form";

export default function AdminEditOrder() {

    const { id } = useParams();
    const { orders } = useContext(OrdersContext);
    const [order, setOrder] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const order = orders.find((order) => +order.id === +id);
        
        setOrder(order);
    }, [orders, id]);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Edit Order</h1>

            <AdminOrderForm order={order} />

            <div className="admin-container-actions">
                <Button text="Delete Order" className='delete-button mx-2' />
                <Button text="Back to Orders" className="secondary-button mx-2" onClick={() => navigate('/admin/orders')} />
                <Button text="Back to Dashboard" className='mx-2' onClick={() => navigate('/admin')} />
            </div>
        </div>
    );
}