import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import './DashboardLayout.css';

function DashboardLayout({ children }) {
    return (
        <div className="layout">
            <Sidebar />
            <main className="layout-content">
                <Navbar />
                <div className="layout-children">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;