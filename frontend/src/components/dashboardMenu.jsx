import { Link } from "react-router-dom"
import "./dashboardMenu.scss"

const DashboardMenu = () => {

    return (
    <nav className="Menu">
        <ul>
            <li><Link to="/account">Mon compte</Link></li>
            <li><Link to="/wallet">Mon portefeuille</Link></li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/values">Mes titres & actions</Link></li>
            <li><Link to="/">Déconnexion</Link></li>
        </ul>
    </nav>
    )
};

export default DashboardMenu;