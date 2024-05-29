import { Link } from "react-router-dom";

export default function AdminOrdersChartItem({ order }) {

    return (
        <Link to={`/admin/orders/${order.id}`} className="admin-chart-item admin-orders-chart-item">
            <p className="admin-chart-item-item">{order.customer_name}</p>
            <p className="admin-chart-item-item">{order.order_number}</p>
            <p className="admin-chart-item-item">{order.order_date}</p>
        </Link>
    )
}