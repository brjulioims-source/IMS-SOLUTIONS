import { useState } from "react";
import Modal from "../components/Modal";
import "./FormSections.css";

function FormSections() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    return(
        <div>
            {/*Secciones horizontales*/}
            <div className="sections">
                <div className="section-card" onClick={() => setIsModalOpen("contrato")}>📑 Contrato</div>
                <div className="section-card" onClick={() => setIsModalOpen("fechas")}>📅 Fechas</div>
                <div className="section-card" onClick={() => setIsModalOpen("costo")}>💵 Costo</div>
                <div className="section-card" onClick={() => setIsModalOpen("conyuge")}>👥 Cónyuge</div>
            </div>

            💵 Costo
        </div>
    )
}