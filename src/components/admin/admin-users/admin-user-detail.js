import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { UsersContext } from "../../../store/users-context";
import { OrdersContext } from "../../../store/orders-context";

import AdminUserDetailChartItem from "./admin-user-detail-chart-item";

export default function AdminUserDetail() {

    const { id } = useParams();
    const { users } = useContext(UsersContext);
    const { orders } = useContext(OrdersContext);
    const [user, setUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const user = users.find((user) => user.id.toString() === id.toString());
        setUser(user);
    }, [users, id]);

    useEffect(() => {
        if (user) {
            setUserOrders(orders.filter((order) => order.uid.toString() === user.id.toString()));
        }
    }, [user, orders]);

    return (
        <div className="admin-user-detail">
            <div className="admin-user-detail-header">
                <h1 className="admin-user-detail-title">{user?.name}</h1>
                <p className="admin-user-detail-email">{user?.email}</p>
                <p className="admin-user-detail-new-order"><Link to={`/admin/user/${id}/order/new`} className="btn btn-primary">Create New Order</Link></p>
                <Link to={`/admin/user/${id}/edit`} className="admin-user-detail-edit">Edit User</Link>
            </div>

            <h2 className="admin-user-detail-orders-title">Orders</h2>

            {userOrders.length === 0 && <p className="admin-user-detail-no-orders">No Orders To Display</p>}

            {userOrders.length > 0 && <div className="admin-user-detail-orders-container">
                <div className="admin-user-detail-orders-header">
                    <p className="admin-user-detail-orders-header-item">Order Number</p>
                    <p className="admin-user-detail-orders-header-item">Order Date</p>
                </div>

                {userOrders.map((order) => (
                    <AdminUserDetailChartItem key={order.id} order={order} />
                ))}
            </div>}

            <div className="admin-user-detail-actions">
                <button className="btn btn-danger mx-2">Delete User</button>
                <Link to={`/admin/user/${id}/edit`} className="btn btn-info mx-2">Edit User</Link>
                <Link to='/admin/users' className="btn btn-primary mx-2">Back</Link>
            </div>
        </div>
    );
}