import { Link } from "react-router-dom";

export default function AdminUserDetailChartItem({ order }) {
    return (
        <Link to={`/admin/orders/${order.id}`} className="admin-chart-item admin-users-chart-item">
            <p className="admin-chart-item-item">{order.order_number}</p>
            <p className="admin-chart-item-item">{order.order_date ? order.order_date : order.created_at}</p>
        </Link>
    )
}