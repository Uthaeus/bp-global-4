import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../store/user-context";

export default function AdminMenu() {
  const { logOutUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      logOutUser();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  }

  return (
    <div className="admin-menu">
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? "admin-nav-link admin-link-active" : "admin-nav-link"
        }
        end
      >
        Admin Home
      </NavLink>
      <NavLink
        to="/admin/user/new"
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

      <Link to={`/admin/user/${user.id}/edit`} className="admin-menu-link">
        Edit Profile
      </Link>
      <p className="admin-menu-link" onClick={signOutHandler}>Logout</p>
    </div>
  );
}
