import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UsersContext } from "../../../store/users-context";
import { OrdersContext } from "../../../store/orders-context";

import AdminOrderModal from "./admin-order-modal";
import Button from "../../ui/button";

export default function AdminOrderDetail() {
    const { id } = useParams();
    const { orders, deleteOrder } = useContext(OrdersContext);
    const { users } = useContext(UsersContext);
    const [order, setOrder] = useState({});
    const [orderUser, setOrderUser] = useState({});
    const [modalImage, setModalImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const order = orders.find((order) => order.id.toString() === id.toString());
        const user = users.find((user) => user.id === order.uid);
        setOrder(order);
        setOrderUser(user);
    }, [orders, id , users]);

    const openModalHandler = (img) => {
        setModalImage(img);
        setModalOpen(true);
    }

    const closeModalHandler = () => {
        setModalImage(null);
        setModalOpen(false);
    }

    const deleteOrderHandler = async () => {
        await deleteOrder(id);
        navigate(`/admin/user/${orderUser.id}`);
    }

    return (
        <div className="admin-order-detail">
            {modalOpen && <AdminOrderModal image={modalImage} onClose={closeModalHandler} />}

            <div className="admin-order-detail-header">
                <div className="admin-order-detail-header-left">
                    <p className="admin-order-detail-header-item">Customer: <Link to={`/admin/user/${orderUser.id}`} className="admin-order-detail-header-item-name mx-2">{orderUser.name}</Link></p>

                    
                </div>
                <div className="admin-order-detail-header-right">
                    <p className="admin-order-detail-header-item">Order Number: <span className="mx-2">{order.order_number}</span></p>

                    <p className="admin-order-detail-header-order-date">Order Date: <span className="mx-2">{order.order_date}</span></p>
                </div>
            </div>

            <div className="admin-order-detail-divider" />

            <div className="admin-order-detail-body">
                {order.images?.map((image, index) => (
                    <div key={index} className="dummy-image" onClick={() => openModalHandler(image)}>
                        <img src={image.url} alt="order-image" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                ))}
            </div>

            <div className="admin-order-detail-actions">
                <Button text="Delete Order" className="delete-button mx-2" onClick={deleteOrderHandler} />
                <Button text="Edit Order" className="edit-button mx-2" onClick={() => navigate(`/admin/orders/${id}/edit`)} />
                <Button text="Back to Orders" className="mx-2" onClick={() => navigate('/admin/orders')} />
            </div>
            
        </div>
    );
}