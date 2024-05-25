
import AdminOrdersChartHeader from "./admin-orders-chart-header";
import AdminUsersChartHeader from "./admin-users-chart-header";
import AdminOrdersChartItem from "./admin-orders-chart-item";
import AdminUsersChartItem from "./admin-users-chart-item";

export default function AdminChart({ type, data }) {
    return (
        <div className="admin-chart-container">
            { type === "orders" && (
                <>
                    <AdminOrdersChartHeader />
                    {data.map((order) => (
                        <AdminOrdersChartItem key={order.id} order={order} />
                    ))}
                </>
            )}

            { type === "users" && (
                <>
                    <AdminUsersChartHeader />
                    {data.map((user) => (
                        <AdminUsersChartItem key={user.id} user={user} />
                    ))}
                </>
            )}
        </div>
    )
}