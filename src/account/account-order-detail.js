import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { OrdersContext } from "../store/orders-context";

import AccountOrderModal from "./account-order-modal";

import image from '../assets/images/overtime_image2_tn.jpg';

export default function AccountOrderDetail() {

    const { id } = useParams();
    const { orders } = useContext(OrdersContext);
    const [order, setOrder] = useState(null);
    const [modalImage, setModalImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const orderImages = [image, image, image];

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
        <div className="account-order-detail">
            {modalOpen && <AccountOrderModal image={modalImage} onClose={closeModalHandler} />}

            <div className="account-order-detail-header">
                <h1 className="account-order-detail-title">Order Number: <span className="mx-4">{order?.order_number}</span></h1>
                <p className="account-order-detail-date">Order Date: <span className="mx-4">{order?.created_at}</span></p>
            </div>

            {orderImages.length === 0 && <p className="account-order-detail-empty">No images to display</p>}

            {orderImages.length > 0 && (
                <div className="account-order-detail-body">

                    {orderImages.map((image, index) => (
                        <div key={index} className="account-order-detail-image-wrapper" onClick={() => openModalHandler(image)}>
                            <img src={image} alt="order-image" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                        </div>
                    ))}
                </div>
            )}

            <div className="account-order-detail-actions">
                <Link to='/account' className="btn btn-secondary mx-2">Back to Account</Link>
                <Link to='/' className="btn btn-primary mx-2">Back to Home</Link>
            </div>
        </div>
    );
}