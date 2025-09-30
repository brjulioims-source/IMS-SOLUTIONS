import { useState } from "react";
import Modal from "../components/modal/Modal";
import DashboardLayout from "../layouts/DashboardLayout";
import StepProgress from "../components/StepProgress";
import Swal from "sweetalert2";
import "./FormSections.css";

function FormSections() {
  const totalSteps = 6;
  const [currentStep, setCurrentStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  // Validación y guardado con Toast
  const handleSubmit = (e, stepNumber, fields) => {
    e.preventDefault();

    const emptyField = fields.some((field) => !field.trim());
    if (emptyField) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "⚠️ Por favor complete todos los campos obligatorios",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      return;
    }

    // Avanza de paso y cierra modal
    setCurrentStep(stepNumber + 1);
    closeModal();

    // Toast de éxito
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "Guardado con éxito",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  // Control de apertura de modales
  const handleOpenModal = (modalStep, modalName) => {
    if (modalStep > currentStep) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "warning",
        title: "⚠️ Debes completar el paso anterior antes de continuar",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
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

        {/* Secciones */}
        <div className="sections">
          <div
            className="section-card"
            onClick={() => handleOpenModal(1, "oficinas")}
          >
            🏢 Oficinas
          </div>
          <div
            className="section-card"
            onClick={() => handleOpenModal(2, "datosPersonales")}
          >
            👤 Datos Personales
          </div>
          <div
            className="section-card"
            onClick={() => handleOpenModal(3, "derivados")}
          >
            👨‍👩‍👧 Derivados (Esposas e Hijos)
          </div>
          <div
            className="section-card"
            onClick={() => handleOpenModal(4, "tipoContrato")}
          >
            📑 Tipo de Contrato
          </div>
          <div
            className="section-card"
            onClick={() => handleOpenModal(5, "costo")}
          >
            💵 Costo
          </div>
          <div
            className="section-card"
            onClick={() => handleOpenModal(6, "observaciones")}
          >
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
              <label>
                <input type="radio" name="oficina" value="Houston" /> Houston
              </label>
              <label>
                <input type="radio" name="oficina" value="Gainesville" /> Gainesville
              </label>
              <label>
                <input type="radio" name="oficina" value="Kissimmee 1" /> Kissimmee 1
              </label>
              <label>
                <input type="radio" name="oficina" value="Norcross" /> Norcross
              </label>
              <label>
                <input type="radio" name="oficina" value="Tampa" /> Tampa
              </label>
              <label>
                <input type="radio" name="oficina" value="Renton" /> Renton
              </label>
              <label>
                <input type="radio" name="oficina" value="Austin" /> Austin
              </label>
              <label>
                <input type="radio" name="oficina" value="San Antonio" /> San Antonio
              </label>
              <label>
                <input type="radio" name="oficina" value="San Juan" /> San Juan
              </label>
              <label>
                <input type="radio" name="oficina" value="Mayagüez" /> Mayagüez
              </label>
              <label>
                <input type="radio" name="oficina" value="New Jersey" /> New Jersey
              </label>
              <label>
                <input type="radio" name="oficina" value="Chula Vista" /> Chula Vista
              </label>
              <label>
                <input type="radio" name="oficina" value="Hackensack" /> Hackensack
              </label>
            </div>

            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </form>
        </Modal>

        {/* Modal Datos Personales */}
        <Modal
          isOpen={openModal === "datosPersonales"}
          onClose={closeModal}
          title="Formulario de Datos Personales"
          className="large"
        >
          <form
            className="form form-grid"
            onSubmit={(e) =>
              handleSubmit(e, 2, [
                e.target[0].value,
                e.target[1].value,
                e.target[2].value,
                e.target[3].value,
                e.target[4].value,
                e.target[5].value,
                e.target[7].value, // idioma nativo
              ])
            }
          >
            {/* Mr/Ms */}
            <label>
              Seleccione según aplique *
              <select>
                <option value="">Seleccione</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </label>

            {/* Nombre */}
            <label>
              Nombre del contratante *
              <input type="text" placeholder="Ejemplo: Juan Hernández" />
            </label>

            {/* Correo */}
            <label>
              Correo electrónico *
              <input
                type="email"
                placeholder="Ejemplo: juanhernandez@gmail.com"
              />
            </label>

            {/* Teléfono */}
            <label>
              Teléfono *
              <input
                type="tel"
                placeholder="Ejemplo: 1234567890"
                pattern="[0-9]+"
                title="Solo números"
              />
            </label>

            {/* Dirección */}
            <label>
              Dirección *
              <input type="text" placeholder="Ingrese la dirección" />
            </label>

            {/* País de origen */}
            <label>
              País de origen *
              <input type="text" placeholder="Ejemplo: Guatemala" />
            </label>

            {/* Fecha de nacimiento */}
            <label>
              Fecha de nacimiento *
              <input type="date" />
            </label>

            {/* Alien Number (opcional) */}
            <label>
              Alien Number
              <input type="text" placeholder="Opcional" />
            </label>

            {/* Idioma nativo */}
            <label>
              Idioma nativo *
              <select>
                <option value="">Seleccione</option>
                <option>Español</option>
                <option>Portugués</option>
                <option>Francés</option>
                <option>Criollo</option>
                <option>Hindi</option>
                <option>Chino (Mandarín y Cantonés)</option>
                <option>Tagalo (Filipino)</option>
                <option>Vietnamita</option>
                <option>Árabe</option>
                <option>Coreano</option>
                <option>Ruso</option>
                <option>Italiano</option>
                <option>Japonés</option>
                <option>Persa (Farsi)</option>
                <option>Urdu</option>
                <option>Gujarati</option>
                <option>Turco</option>
                <option>Tailandés</option>
                <option>Inglés</option>
              </select>
            </label>

            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default FormSections;
