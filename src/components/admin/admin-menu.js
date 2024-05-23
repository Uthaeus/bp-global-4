import { NavLink, Link } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="admin-menu">
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? "admin-nav-link admin-link-active" : "admin-nav-link"
        }
      >
        Admin Home
      </NavLink>
      <NavLink
        to="/admin/users/new"
        className={({ isActive }) =>
          isActive ? "admin-nav-link admin-link-active" : "admin-nav-link"
        }
      >
        Create New User
      </NavLink>
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          isActive ? "admin-nav-link admin-link-active" : "admin-nav-link"
        }
      >
        All Users
      </NavLink>
      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          isActive ? "admin-nav-link admin-link-active" : "admin-nav-link"
        }
      >
        All Orders
      </NavLink>

      <div className="admin-menu-divider" />

      <Link to="/" className="admin-menu-link">
        Edit Profile
      </Link>
      <p className="admin-menu-link">Logout</p>
    </div>
  );
}
