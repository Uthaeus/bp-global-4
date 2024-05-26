import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLayout from "./components/layouts/admin-layout";
import AdminHome from "./components/admin/admin-home";
import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Error from "./components/error/error";
import AdminUsers from "./components/admin/admin-users/admin-users";
import AdminNewUser from "./components/admin/admin-users/admin-new-user";
import AdminEditUser from "./components/admin/admin-users/admin-edit-user";
import AdminUserDetail from "./components/admin/admin-users/admin-user-detail";
import AdminOrders from "./components/admin/admin-orders/admin-orders";
import AdminOrderDetail from "./components/admin/admin-orders/admin-order-detail";
import AdminNewOrder from "./components/admin/admin-orders/admin-new-order";
import AdminEditOrder from "./components/admin/admin-orders/admin-edit-order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/user/new",
        element: <AdminNewUser />,
      },
      {
        path: "/admin/user/:id/edit",
        element: <AdminEditUser />,
      },
      {
        path: "/admin/user/:id",
        element: <AdminUserDetail />,
      },
      {
        path: "/admin/user/:id/order/new",
        element: <AdminNewOrder />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/orders/:id",
        element: <AdminOrderDetail />,
      },
      {
        path: "/admin/orders/:id/edit",
        element: <AdminEditOrder />,
      }
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
