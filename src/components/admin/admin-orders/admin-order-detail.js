import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { OrdersContext } from "../../../store/orders-context";
import image from '../../../assets/images/globe.png';

import AdminOrderModal from "./admin-order-modal";

export default function AdminOrderDetail() {
    const { id } = useParams();
    const { orders } = useContext(OrdersContext);
    const [order, setOrder] = useState({});
    const [orderImages, setOrderImages] = useState([image, image, image]);
    const [modalImage, setModalImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const order = orders.find((order) => order.id.toString() === id.toString());
        setOrder(order);
    }, [orders, id]);

    const openModalHandler = (img) => {
        setModalImage(img);
        setModalOpen(true);
    }

    const closeModalHandler = () => {
        setModalImage(null);
        setModalOpen(false);
    }

    return (
        <div className="admin-order-detail">
            {modalOpen && <AdminOrderModal image={modalImage} onClose={closeModalHandler} />}

            <div className="admin-order-detail-header">
                <div className="admin-order-detail-header-left">
                    <p className="admin-order-detail-header-item">Customer: <Link to={`/admin/user/${order.uid}`} className="admin-order-detail-header-item-name mx-2">{order.customer_name}</Link></p>

                    <p className="admin-order-detail-header-order-date">Order Date: <span className="mx-2">{order.created_at}</span></p>
                </div>
                <div className="admin-order-detail-header-right">
                    <p className="admin-order-detail-header-item">Order Number: <span className="mx-2">{order.order_number}</span></p>
                </div>
            </div>

            <div className="admin-order-detail-body">

                {orderImages.map((image, index) => (
                    <div key={index} className="dummy-image" onClick={() => openModalHandler(image)}>
                        <img src={image} alt="order-image" />
                    </div>
                ))}
            </div>

            <div className="admin-order-detail-actions">
                <button className="btn btn-danger mx-3">Delete Order</button>

                <Link to={`/admin/orders/${id}/edit`} className="btn btn-info mx-3">Edit Order</Link>

                <Link to="/admin/orders" className="btn btn-primary mx-3">Back</Link>

            </div>
            
        </div>
    );
}