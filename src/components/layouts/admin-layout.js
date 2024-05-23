import { Outlet } from "react-router-dom";

import MainNavigation from "../navigation/main-navigation";
import AdminMenu from "../admin/admin-menu";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <MainNavigation />

            <div className="admin-layout-body">
                <AdminMenu />
                <Outlet />
            </div>
        </div>
    );
}