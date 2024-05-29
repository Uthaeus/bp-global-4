import { Link } from "react-router-dom";

export default function AdminUsersChartItem({ user }) {
    return (
        <Link to={`/admin/user/${user.id}`} className="admin-chart-item admin-users-chart-item">
            <p className="admin-chart-item-item">{user.name}</p>
            <p className="admin-chart-item-item">{user.email}</p>
        </Link>
    )
}