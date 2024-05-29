import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

import { UsersContext } from "../../../store/users-context";
import { OrdersContext } from "../../../store/orders-context";

import AdminChart from "../admin-chart/admin-chart";
import Button from "../../ui/button";

export default function AdminUserDetail() {

    const { id } = useParams();
    const { users } = useContext(UsersContext);
    const { orders } = useContext(OrdersContext);
    const [user, setUser] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    const navigate = useNavigate();

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
                <p className="admin-user-detail-new-order">
                    <Button text="Create New Order" onClick={() => navigate(`/admin/user/${id}/order/new`)} />
                </p>
                <Link to={`/admin/user/${id}/edit`} className="admin-user-detail-edit">Edit User</Link>
            </div>

            <h2 className="admin-user-detail-orders-title">Orders</h2>

            {userOrders.length === 0 && <p className="admin-user-detail-no-orders">No Orders To Display</p>}

            {userOrders.length > 0 && <AdminChart type='user-detail' data={userOrders} /> }

            <div className="admin-user-detail-actions">
                <Button text="Delete User" className="delete-button mx-2" onClick={() => navigate(`/admin/user/${id}/delete`)} />
                <Button text="Edit User" className="edit-button mx-2" onClick={() => navigate(`/admin/user/${id}/edit`)} />
                <Button text="Back to Users" className="mx-2" onClick={() => navigate('/admin/users')} />
            </div>
        </div>
    );
}