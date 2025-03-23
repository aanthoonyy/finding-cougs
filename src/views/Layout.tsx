import { Outlet, Link } from "react-router-dom";
import '../css files/main.css'

function Layout() {
  return (
      <><nav>
          <ul className="col d-flex rightAlign">
              <li className="navbarContent">
                  <Link to="/" className="navbarConentLink">Home</Link>
              </li>
              <li className="navbarContent">
                  <Link to="/network" className="navbarConentLink">Network</Link>
              </li>
              <li className="navbarContent">
                  <Link to="/group" className="navbarConentLink">Group</Link>
              </li>
              <li className="navbarContent">
                  <Link to="/job" className="navbarConentLink">Job</Link>
              </li>
              <li className="navbarContent">
                  <Link to="/notification" className="navbarConentLink">Notification</Link>
              </li>
              <li className="navbarContent">
                  <Link to="/profile" className="navbarConentLink">Profile</Link>
              </li>
          </ul>
      </nav><Outlet /></>
  )
};

export default Layout;