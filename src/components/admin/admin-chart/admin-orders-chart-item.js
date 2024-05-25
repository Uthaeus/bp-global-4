import { Link } from "react-router-dom";

export default function AdminOrdersChartItem({ order }) {

    return (
        <Link to={`/admin/orders/${order.id}`} className="admin-orders-chart-item">
            <p className="admin-orders-chart-item-title">{order.customer_name}</p>
            <p className="admin-orders-chart-item-title">{order.order_number}</p>
            <p className="admin-orders-chart-item-title">{order.created_at}</p>
        </Link>
    )
}