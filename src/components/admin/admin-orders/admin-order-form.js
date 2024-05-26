import { useForm } from "react-hook-form"
import { useEffect } from "react"

export default function AdminOrderForm({ order }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (order) {
            reset(order);
        }
    }, [order, reset]);

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

            <button type="submit" className="btn btn-primary">{ order ? "Update Order" : "Create Order"}</button>
        </form>
    )
}