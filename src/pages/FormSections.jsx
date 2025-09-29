import { useState } from "react";
import Modal from "../components/navbar/Modal";
import DashboardLayout from "../layouts/DashboardLayout";
import "./FormSections.css";

function FormSections() {
    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => setOpenModal(false);

    return(
        <DashboardLayout>
        <div>
            {/*Secciones horizontales*/}
            <div className="sections">
                <div className="section-card" onClick={() => setOpenModal("contrato")}>📑 Contrato</div>
                <div className="section-card" onClick={() => setOpenModal("fechas")}>📅 Fechas</div>
                <div className="section-card" onClick={() => setOpenModal("costo")}>💵 Costo</div>
                <div className="section-card" onClick={() => setOpenModal("conyuge")}>👥 Cónyuge</div>
            </div>

            {/* Modal Contrato */}

            <Modal isOpen={openModal === "contrato"} onClose={closeModal} title="Formulario de Contrato">
                <form className="form"> 
                    <label>Número de Contrato:</label>
                    <input type="text" placeholder="Ingrese el número de contrato" /> 
                    <label>Cliente:</label>
                    <input type="text" placeholder="Ingrese el nombre del cliente" />
                    <button type="submit">Guardar</button>
                </form>
            </Modal>

            {/* Modal Fechas */}
            <Modal isOpen={openModal === "fechas"} onClose={closeModal} title="Formulario de Fechas">
                <form className="form">
                    <label>Fecha de inicio</label> 
                    <input type="date" />
                    <label>Fecha de vencimiento</label>
                    <input type="date" />
                    <button type="submit">Guardar</button>
                </form>
            </Modal>

            {/* Modal Costo */}
            <Modal isOpen={openModal === "costo"} onClose={closeModal} title="Formulario de Costo">
                <form className="form">
                    <label>Monto</label>
                    <input type="number" placeholder="0.00" />
                    <label>Moneda</label>
                    <input type="text" placeholder="USD, EUR..." />
                    <button type="submit">Guardar</button>
                </form>
            </Modal>

            {/* Modal Cónyuge */}
            <Modal isOpen={openModal === "conyuge"} onClose={closeModal} title="Formulario de Cónyuge">
                <form className="form">
                    <label>Nombre completo</label>
                    <input type="text" placeholder="Ingrese el nombre completo" />
                    <label>Correo electrónico</label>
                    <input type="email" placeholder="Ingrese el correo electrónico" />
                    <button type="submit">Guardar</button>
                </form>
            </Modal>
        </div>
        </DashboardLayout>
    )  
}

export default FormSections;