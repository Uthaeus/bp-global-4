import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLayout from "./components/layouts/admin-layout";
import AdminHome from "./components/admin/admin-home";
import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
