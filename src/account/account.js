import { useContext } from "react"
import { Link } from "react-router-dom";

import { UserContext } from "../store/user-context";
import { OrdersContext } from "../store/orders-context";

import AccountOrderItem from "./account-order-item";

export default function Account() {
    const { user } = useContext(UserContext);
    const { orders } = useContext(OrdersContext);

    return (
        <div className="account">
            <div className="account-header">
                <h1 className="account-title">{user?.name}</h1>
                <p className="account-email">{user?.email}</p>
                <Link to='/account/edit' className="account-edit">Edit Account</Link>
            </div>

            <h2 className="account-orders-title">Orders</h2>

            {orders.length === 0 && <p className="account-orders-empty">No orders to display</p>}

            {orders.length > 0 && (
                <div className="account-orders-container">
                    <div className="account-orders-header">
                        <p className="account-orders-header-item">Order Number</p>
                        <p className="account-orders-header-item">Order Date</p>
                    </div>

                    {orders.map((order) => (
                        <AccountOrderItem key={order.id} order={order} />
                    ))}
                </div>
            )}

            <div className="account-actions">
                <Link to='/' className="btn btn-primary">Back to Home</Link>
            </div>
        </div>
    )
}