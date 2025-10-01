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

  // Guardar la data de cada formulario
  const [formData, setFormData] = useState({
    oficinas: {},
    datosPersonales: {},
  });

  const closeModal = () => setOpenModal(false);

  // Validación y guardado con Toast
  const handleSubmit = (e, stepKey, stepNumber, fields) => {
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

    // Guardamos los datos del formulario en el estado
    const data = Object.fromEntries(new FormData(e.target).entries());
    setFormData((prev) => ({ ...prev, [stepKey]: data }));

    // Avanza de paso y cierra modal
    setCurrentStep(stepNumber + 1);
    closeModal();

    // Toast de éxito
    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "✅ Guardado con éxito",
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

    // Si ya hay datos guardados en este paso, preguntar si quiere editar
    if (formData[modalName] && Object.keys(formData[modalName]).length > 0) {
      Swal.fire({
        title: "Ya guardaste este paso",
        text: "¿Quieres editar la información?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, editar",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenModal(modalName);
        }
      });
    } else {
      setOpenModal(modalName);
    }
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
              handleSubmit(e, "oficinas", 1, [
                e.target.querySelector("input[type='radio']:checked")?.value || "",
              ])
            }
          >
            <p>Por favor seleccione la oficina a la cual vincular este contrato:</p>

            <div className="oficinas-grid">
              {[
                "Houston",
                "Gainesville",
                "Kissimmee 1",
                "Norcross",
                "Tampa",
                "Renton",
                "Austin",
                "San Antonio",
                "San Juan",
                "Mayagüez",
                "New Jersey",
                "Chula Vista",
                "Hackensack",
              ].map((oficina) => (
                <label key={oficina}>
                  <input
                    type="radio"
                    name="oficina"
                    value={oficina}
                    defaultChecked={formData.oficinas?.oficina === oficina}
                  />
                  {oficina}
                </label>
              ))}
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
              handleSubmit(e, "datosPersonales", 2, [
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
            <label>
              Seleccione según aplique *
              <select
                name="saludo"
                defaultValue={formData.datosPersonales?.saludo || ""}
              >
                <option value="">Seleccione</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </label>

            <label>
              Nombre del contratante *
              <input
                type="text"
                name="nombre"
                defaultValue={formData.datosPersonales?.nombre || ""}
                placeholder="Ejemplo: Juan Hernández"
              />
            </label>

            <label>
              Correo electrónico *
              <input
                type="email"
                name="correo"
                defaultValue={formData.datosPersonales?.correo || ""}
                placeholder="Ejemplo: juanhernandez@gmail.com"
              />
            </label>

            <label>
              Teléfono *
              <input
                type="tel"
                name="telefono"
                defaultValue={formData.datosPersonales?.telefono || ""}
                placeholder="Ejemplo: 1234567890"
                pattern="[0-9]+"
              />
            </label>

            <label>
              Dirección *
              <input
                type="text"
                name="direccion"
                defaultValue={formData.datosPersonales?.direccion || ""}
                placeholder="Ingrese la dirección"
              />
            </label>

            <label>
              País de origen *
              <input
                type="text"
                name="pais"
                defaultValue={formData.datosPersonales?.pais || ""}
                placeholder="Ejemplo: Guatemala"
              />
            </label>

            <label>
              Fecha de nacimiento *
              <input
                type="date"
                name="fechaNacimiento"
                defaultValue={formData.datosPersonales?.fechaNacimiento || ""}
              />
            </label>

            <label>
              Alien Number
              <input
                type="text"
                name="alienNumber"
                defaultValue={formData.datosPersonales?.alienNumber || ""}
                placeholder="Opcional"
              />
            </label>

            <label>
              Idioma nativo *
              <select
                name="idioma"
                defaultValue={formData.datosPersonales?.idioma || ""}
              >
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
