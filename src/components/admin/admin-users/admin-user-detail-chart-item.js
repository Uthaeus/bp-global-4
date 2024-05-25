import { Link } from "react-router-dom";

export default function AdminUserDetailChartItem({ order }) {
    return (
        <Link to={`/admin/orders/${order.id}`} className="admin-user-detail-order-chart-item">
            <p className="admin-user-detail-chart-item-title">{order.order_number}</p>
            <p className="admin-user-detail-chart-item-title">{order.created_at}</p>
        </Link>
    )
}