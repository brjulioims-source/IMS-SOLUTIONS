import { useState } from "react";
import Modal from "../components/modal/Modal";
import DashboardLayout from "../layouts/DashboardLayout";
import StepProgress from "../components/StepProgress";
import Swal from "sweetalert2";
import "./FormSections.css";

function FormSections() {
  const totalSteps = 6; // ahora tienes 6 pasos
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  // Configuración global de Toast
  const toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  // Validación y guardado
  const handleSubmit = (e, stepNumber, fields) => {
    e.preventDefault();

    const emptyField = fields.some((field) => !field.trim());

    if (emptyField) {
      toast.fire({
        icon: "error",
        title: "Por favor completa todos los campos",
      });
      return;
    }

    // Guardado exitoso
    setCurrentStep(stepNumber + 1);
    closeModal();

    toast.fire({
      icon: "success",
      title: "Datos guardados con éxito",
    });
  };

  // Control de apertura de modales
  const handleOpenModal = (modalStep, modalName) => {
    if (modalStep > currentStep) {
      toast.fire({
        icon: "warning",
        title: "Debes completar el paso anterior primero",
      });
      return;
    }
    setOpenModal(modalName);
  };

  return (
    <DashboardLayout>
      <div>
        {/* Barra de progreso */}
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Secciones horizontales */}
        <div className="sections">
          <div className="section-card" onClick={() => handleOpenModal(1, "oficinas")}>
            🏢 Oficinas
          </div>
          <div className="section-card" onClick={() => handleOpenModal(2, "datosPersonales")}>
            👤 Datos Personales
          </div>
          <div className="section-card" onClick={() => handleOpenModal(3, "derivados")}>
            👨‍👩‍👧 Derivados (Esposas e Hijos)
          </div>
          <div className="section-card" onClick={() => handleOpenModal(4, "tipoContrato")}>
            📑 Tipo de Contrato
          </div>
          <div className="section-card" onClick={() => handleOpenModal(5, "costo")}>
            💵 Costo
          </div>
          <div className="section-card" onClick={() => handleOpenModal(6, "observaciones")}>
            📝 Observaciones
          </div>
        </div>

        {/* Modal Oficinas */}
        <Modal
          isOpen={openModal === "oficinas"}
          onClose={closeModal}
          title="Formulario de Oficinas"
        >
          <form
            className="form"
            onSubmit={(e) =>
              handleSubmit(e, 1, [
                e.target.querySelector("input[type='radio']:checked")?.value || "",
              ])
            }
          >
            <p>Por favor seleccione la oficina a la cual vincular este contrato:</p>

            <div className="oficinas-grid">
              <label><input type="radio" name="oficina" value="Houston" /> Houston</label>
              <label><input type="radio" name="oficina" value="Gainesville" /> Gainesville</label>
              <label><input type="radio" name="oficina" value="Kissimmee 1" /> Kissimmee 1</label>
              <label><input type="radio" name="oficina" value="Norcross" /> Norcross</label>
              <label><input type="radio" name="oficina" value="Tampa" /> Tampa</label>
              <label><input type="radio" name="oficina" value="Renton" /> Renton</label>
              <label><input type="radio" name="oficina" value="Austin" /> Austin</label>
              <label><input type="radio" name="oficina" value="San Antonio" /> San Antonio</label>
              <label><input type="radio" name="oficina" value="San Juan" /> San Juan</label>
              <label><input type="radio" name="oficina" value="Mayagüez" /> Mayagüez</label>
              <label><input type="radio" name="oficina" value="New Jersey" /> New Jersey</label>
              <label><input type="radio" name="oficina" value="Chula Vista" /> Chula Vista</label>
              <label><input type="radio" name="oficina" value="Hackensack" /> Hackensack</label>
            </div>

            <button type="submit" className="btn-primary">Guardar</button>
          </form>
        </Modal>

        {/* Modal Datos Personales */}
        <Modal
          isOpen={openModal === "datosPersonales"}
          onClose={closeModal}
          title="Formulario de Datos Personales"
        >
          <form
            className="form"
            onSubmit={(e) =>
              handleSubmit(e, 2, [e.target[0].value, e.target[1].value])
            }
          >
            <label>Nombre completo</label>
            <input type="text" placeholder="Ingrese el nombre completo" />
            <label>Correo electrónico</label>
            <input type="email" placeholder="Ingrese el correo electrónico" />
            <button type="submit">Guardar</button>
          </form>
        </Modal>

        {/* Modal Derivados */}
        <Modal
          isOpen={openModal === "derivados"}
          onClose={closeModal}
          title="Formulario de Derivados"
        >
          <form
            className="form"
            onSubmit={(e) =>
              handleSubmit(e, 3, [e.target[0].value])
            }
          >
            <label>Derivados (Esposas e Hijos)</label>
            <input type="text" placeholder="Ingrese nombres de derivados" />
            <button type="submit">Guardar</button>
          </form>
        </Modal>

        {/* Modal Tipo de Contrato */}
        <Modal
          isOpen={openModal === "tipoContrato"}
          onClose={closeModal}
          title="Formulario de Tipo de Contrato"
        >
          <form
            className="form"
            onSubmit={(e) =>
              handleSubmit(e, 4, [e.target[0].value])
            }
          >
            <label>Tipo de Contrato</label>
            <input type="text" placeholder="Ingrese el tipo de contrato" />
            <button type="submit">Guardar</button>
          </form>
        </Modal>

        {/* Modal Costo */}
        <Modal
          isOpen={openModal === "costo"}
          onClose={closeModal}
          title="Formulario de Costo"
        >
          <form
            className="form"
            onSubmit={(e) =>
              handleSubmit(e, 5, [e.target[0].value, e.target[1].value])
            }
          >
            <label>Monto</label>
            <input type="number" placeholder="0.00" />
            <label>Moneda</label>
            <input type="text" placeholder="USD, EUR..." />
            <button type="submit">Guardar</button>
          </form>
        </Modal>

        {/* Modal Observaciones */}
        <Modal
          isOpen={openModal === "observaciones"}
          onClose={closeModal}
          title="Formulario de Observaciones"
        >
          <form
            className="form"
            onSubmit={(e) =>
              handleSubmit(e, 6, [e.target[0].value])
            }
          >
            <label>Observaciones</label>
            <textarea placeholder="Ingrese observaciones" />
            <button type="submit">Guardar</button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default FormSections;
