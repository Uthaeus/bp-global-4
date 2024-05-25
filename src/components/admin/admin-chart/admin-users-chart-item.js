import { Link } from "react-router-dom";

export default function AdminUsersChartItem({ user }) {
    return (
        <Link to={`/admin/user/${user.id}`} className="admin-users-chart-item">
            <p className="admin-users-chart-item-title">{user.name}</p>
            <p className="admin-users-chart-item-title">{user.email}</p>
        </Link>
    )
}