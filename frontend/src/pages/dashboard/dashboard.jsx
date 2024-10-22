import DashboardMenu from '../../components/dashboardMenu';
import "./dashboard.scss";

function Dashboard() {

    /*
    vérification du token et redirection ci nécessaire
    const token = sessionStorage.getItem('token');

    if (!token) {
    wondow.location.href = '/';
    }
    */
    
    return (
        <div>
            <DashboardMenu />
            <div className='App'>
                
            </div>
        </div>
    )
}

export default Dashboard