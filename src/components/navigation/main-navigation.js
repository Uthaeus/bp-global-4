import { NavLink } from "react-router-dom";

export default function MainNavigation() {

    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                <p>logo here</p>
            </div>

            <div className="main-navigation-right">
                <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} end>Home</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>About</NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Contact</NavLink>
            </div>
        </div>
    )
}