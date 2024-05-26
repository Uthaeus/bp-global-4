import { useForm } from "react-hook-form"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router";

import { OrdersContext } from "../../../store/orders-context";

export default function AdminOrderForm({ order, user }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [orderImages, setOrderImages] = useState([]);

    const navigate = useNavigate();

    const { addOrder, updateOrder } = useContext(OrdersContext);

    useEffect(() => {
        if (order) {
            reset(order);
        } else {
            reset({
                uid: user.id,
                customer_name: user.name
            });
        }
    }, [order, reset, user]);

    const addImageHandler = (event) => {

        // create url
        const url = URL.createObjectURL(event.target.files[0]);
        setOrderImages([...orderImages, url]);
    }

    const removeImageHandler = (img) => {
        setOrderImages(orderImages.filter((image) => image !== img));
    }

    const onSubmit = async (data) => {
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        try {

            const orderObj = {
                ...data,
                images: orderImages
            }

            if (order) {
                orderObj.updated_at = formattedDate;
                updateOrder(orderObj);
                console.log('edited order submitted', orderObj);
            } else {
                orderObj.id = new Date().getTime();
                orderObj.created_at = formattedDate;
                addOrder(orderObj);
                console.log('order submitted', orderObj);
            }
        } catch (error) {
            console.log('order submit error',error);
        } finally {
            navigate(`/admin/user/${data.uid}`);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="admin-order-form">

            <div className="form-group mb-3">
                <label htmlFor="customer_name">Customer Name</label>
                <input type="text" id="customer_name" className="form-control" {...register("customer_name")} disabled={true} />
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
                        <img src={image} alt="order image" className="order-form-image" />

                        <button type="button" className="btn btn-danger order-form-image-remove" onClick={() => removeImageHandler(image)}>X</button>
                    </div>
                ))}
            </div>

            <button type="submit" className="btn btn-primary">{ order ? "Update Order" : "Create Order"}</button>
        </form>
    )
}