import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { UsersContext } from "../../../store/users-context";
import Button from "../../ui/button";

import AdminOrderForm from "./admin-order-form";

export default function AdminNewOrder() {

    const { users } = useContext(UsersContext);
    const [user, setUser] = useState({});
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const u = users.find((user) => user.id === id);
        setUser(u);
    }, [users, id]);

    return (
        <div className="admin-container">
            <h1 className="admin-title">Create New Order</h1>

            <AdminOrderForm user={user} />

            <div className="admin-container-actions">
                <Button text="Back to Orders" className='secondary-button mx-2' onClick={() => navigate('/admin/orders')} />
                <Button text="Back to Dashboard" className='mx-2' onClick={() => navigate('/admin')} />
            </div>
        </div>
    );
}