import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "../../store/user-context";

import MainNavigation from "../navigation/main-navigation";
import AdminMenu from "../admin/admin-menu";

export default function AdminLayout() {
    const navigate = useNavigate();
    const { isAdmin } = useContext(UserContext);

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);
    
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