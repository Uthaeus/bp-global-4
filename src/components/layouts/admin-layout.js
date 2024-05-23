import { Outlet } from "react-router-dom";

import MainNavigation from "../navigation/main-navigation";

export default function AdminLayout() {
    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
    );
}