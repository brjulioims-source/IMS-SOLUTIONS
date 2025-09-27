import { useState } from "react";
import Modal from "../components/Modal";
import "./FormSections.css";

function FormSections() {
    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => setOpenModal(false);

    return(
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
                    <label>Número de Contrato:
                        <input type="text" placeholder="Ingrese el número de contrato" />
                    </label>
                    <label>Cliente:
                        <input type="text" placeholder="Ingrese el nombre del cliente" />
                        <button type="submit">Guardar</button>
                    </label>
                </form>
        
            </Modal>
        </div>
    )
}