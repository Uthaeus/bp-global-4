import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

export default function AdminOrderForm({ order }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [orderImages, setOrderImages] = useState([]);

    useEffect(() => {
        if (order) {
            reset(order);
        }
    }, [order, reset]);

    const addImageHandler = (event) => {

        // create url
        const url = URL.createObjectURL(event.target.files[0]);
        setOrderImages([...orderImages, url]);
    }

    const removeImageHandler = (img) => {
        setOrderImages(orderImages.filter((image) => image !== img));
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="admin-order-form">

            <div className="form-group mb-3">
                <label htmlFor="customer_name">Customer Name</label>
                <input type="text" id="customer_name" className="form-control" {...register("customer_name", { required: true })} />
                {errors.customer_name && <span className="text-danger">Customer Name is required</span>}
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