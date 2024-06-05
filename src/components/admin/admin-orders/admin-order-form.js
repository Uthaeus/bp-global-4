import { useForm } from "react-hook-form"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../../firebase";

import { OrdersContext } from "../../../store/orders-context";
import Button from "../../ui/button";

export default function AdminOrderForm({ order, user }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [orderImages, setOrderImages] = useState([]);

    const navigate = useNavigate();

    const { addOrder, updateOrder } = useContext(OrdersContext);

    useEffect(() => {
        if (order) {
            reset(order);
            setOrderImages(order.images || []);
        }
    }, [order, reset]);

    const addImageHandler = async (event) => {
        const file = event.target.files[0];
        const fileName = file.name + Date.now();

        const storageRef = ref(storage, `images/${fileName}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setOrderImages(state => [...state, { fileName, url }]);
    }

    const removeImageHandler = async (img) => {
        const updatedImages = [];
        for (let i = 0; i < orderImages.length; i++) {
            if (orderImages[i].fileName === img.fileName) {
                // delete image from firebase
                const storageRef = ref(storage, `images/${img.fileName}`);
                await deleteObject(storageRef);
            } else {
                updatedImages.push(orderImages[i]);
            }
        }
        setOrderImages(updatedImages);
    }

    const onSubmit = async (data) => {
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        try {

            if (order) {
                const updatedOrder = {
                    ...order,
                    ...data,
                    images: orderImages,
                    updated_at: formattedDate
                }
                
                updateOrder(updatedOrder);
                console.log('edited order submitted', updatedOrder);
            } else {
                const newOrder = {
                    ...data,
                    images: orderImages,
                    created_at: formattedDate,
                    uid: user.id,
                    customer_name: user.name
                }
                
                addOrder(newOrder);
                console.log('order submitted', newOrder);
            }

            navigate(`/admin/user/${data.uid}`);
        } catch (error) {
            console.log('order submit error',error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="admin-order-form">
            <div className="row mb-3">
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="customer_name">Customer Name</label>
                        <input type="text" id="customer_name" className="form-control" {...register("customer_name")} disabled={true} />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label htmlFor="order_date">Order Date</label>
                        <input type="date" id="order_date" className="form-control" {...register("order_date")} />
                    </div>
                </div>
            </div>

            <div className="d-none">
                <input type="text" id="uid" className="form-control" {...register("uid")} />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="order_number">Order Number</label>
                <input type="text" id="order_number" className="form-control" {...register("order_number", { required: true })} />
                {errors.order_number && <span className="text-danger">Order Number is required</span>}
            </div>

            <div className="form-group mb-3">
                <label htmlFor="image">Add Image</label>

                <input type="file" id="image" className="form-control" onChange={addImageHandler} />
            </div>

            <div className="order-form-images">
                {orderImages.length === 0 && <p>No images added</p>}
                {orderImages.map((image, index) => (
                    <div key={index} className="order-form-image-wrapper">
                        <img src={image.url} alt="order image" className="order-form-image" />

                        <button type="button" className="btn btn-danger order-form-image-remove" onClick={() => removeImageHandler(image)}>X</button>
                    </div>
                ))}
            </div>

            <Button text={ order ? "Update Order" : "Create Order"} />
        </form>
    )
}