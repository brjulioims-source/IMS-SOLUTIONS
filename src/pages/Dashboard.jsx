import DashboardLayout from "../layouts/DashboardLayout";
import "./Dashboard.css";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="card">
          <h3>Usuarios</h3>
          <p>245 activos</p>
        </div>
        <div className="card">
          <h3>Ventas</h3>
          <p>$12,340 este mes</p>
        </div>
        <div className="card">
          <h3>Soporte</h3>
          <p>32 tickets abiertos</p>
        </div>
        <div className="card">
          <h3>Notificaciones</h3>
          <p>5 nuevas</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;


