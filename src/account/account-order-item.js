import { Link } from "react-router-dom";

export default function AccountOrderItem({ order }) {

    return (
        <Link to={`/account/orders/${order.id}`} className="account-order-item">
            <p className="account-order-item-item">{order.order_number}</p>
            <p className="account-order-item-item">{order.created_at}</p>
        </Link>
    )
}