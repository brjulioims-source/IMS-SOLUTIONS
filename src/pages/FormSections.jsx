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
  const [hasSpouse, setHasSpouse] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [hasChildren, setHasChildren] = useState("");
  const [childrenNames, setChildrenNames] = useState([]);
  const [numChildren, setNumChildren] = useState("");



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


        {/* Modal Derivados */}
 <Modal
  isOpen={openModal === "derivados"}
  onClose={closeModal}
  title="Formulario de Derivados (Esposo/a e Hijos)"
>
  <form
    className="form form-grid"
    onSubmit={(e) => {
      e.preventDefault();

      // Validar si escogió esposo(a)
      if (!hasSpouse) {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "error",
          title: "⚠️ Debe seleccionar si tiene esposo(a) o no",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        return;
      }

      if (hasSpouse === "si" && !spouseName.trim()) {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "error",
          title: "⚠️ Debe ingresar el nombre del esposo/a",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        return;
      }

      // Validar si escogió hijos
      if (!hasChildren) {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "error",
          title: "⚠️ Debe seleccionar si tiene hijos o no",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        return;
      }

      if (hasChildren === "si") {
        if (!numChildren || numChildren <= 0) {
          Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "error",
            title: "⚠️ Debe ingresar la cantidad de hijos",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          return;
        }

        if (childrenNames.some((child) => !child.trim())) {
          Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "error",
            title: "⚠️ Debe ingresar todos los nombres de los hijos",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          return;
        }
      }

      // Guardar en el estado global
      const data = {
        hasSpouse,
        spouseName,
        hasChildren,
        numChildren,
        childrenNames,
      };

      setFormData((prev) => ({ ...prev, derivados: data }));
      setCurrentStep(4);
      closeModal();

      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "✅ Derivados guardados con éxito",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }}
  >
    {/* Pregunta esposo/a */}
    <label>
      ¿Tienes esposo(a)? *
      <select
        value={hasSpouse}
        onChange={(e) => setHasSpouse(e.target.value)}
      >
        <option value="" disabled>
          Seleccione
        </option>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
    </label>

    {hasSpouse === "si" && (
      <label>
        Nombre del esposo(a) *
        <input
          type="text"
          value={spouseName}
          onChange={(e) => setSpouseName(e.target.value)}
          placeholder="Ejemplo: Ana Pérez"
        />
      </label>
    )}

    {/* Pregunta hijos */}
    <label>
      ¿Tienes hijos? *
      <select
        value={hasChildren}
        onChange={(e) => {
          setHasChildren(e.target.value);
          setChildrenNames([]);
          setNumChildren(0);
        }}
      >
        <option value="" disabled>
          Seleccione
        </option>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
    </label>

    {hasChildren === "si" && (
      <>
        <label>
          ¿Cuántos hijos tienes? (máx. 12) *
          <input
            type="number"
            min="1"
            max="12"
            value={numChildren}
            onChange={(e) => {
              const value = Math.min(parseInt(e.target.value, 10) || 0, 12);
              setNumChildren(value);
              setChildrenNames(Array(value).fill(""));
            }}
          />
        </label>

        {Array.from({ length: numChildren }, (_, i) => (
          <label key={i}>
            Nombre del hijo {i + 1} *
            <input
              type="text"
              value={childrenNames[i] || ""}
              onChange={(e) => {
                const updated = [...childrenNames];
                updated[i] = e.target.value;
                setChildrenNames(updated);
              }}
              placeholder={`Ejemplo: Hijo ${i + 1}`}
            />
          </label>
        ))}
      </>
    )}

    <button type="submit" className="btn-guardar">
      Guardar
    </button>
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
              handleSubmit(e, "tipoContrato", 4, [
                e.target.tipoContrato.value
              ])
            }
          >
            <label>
              Por favor ingrese el nombre del contrato a generar *
              <select
                name="tipoContrato"
                defaultValue={formData.tipoContrato?.tipoContrato || ""}
              >
                <option value="">Seleccione un contrato</option>
                <option>ADMINISTRATIVE CLOSURE</option>
                <option>AFFIRMATIVE ASYLUM</option>
                <option>ALTERNATIVE TO DETENTION</option>
                <option>APPEAL</option>
                <option>APPEARANCE AS ATTORNEY</option>
                <option>APPEARANCE AS ATTORNEY (CREDIBLE FEAR INTERVIEW)</option>
                <option>ASILO AFIRMATIVO FUERA DEL AÑO</option>
                <option>BOND</option>
                <option>CANCELLATION OF REMOVAL</option>
                <option>CITIZENSHIP PROCESS (N-600)</option>
                <option>CITIZENSHIP PROCESS (N-400)</option>
                <option>CUBAN ADJUSTMENT</option>
                <option>DEFENSIVE ASYLUM</option>
                <option>DEPENDENCY ACTION</option>
                <option>DOCUMENTARY REVIEW</option>
                <option>FAMILY PETITION</option>
                <option>FAMILY PETITION (I-130)</option>
                <option>FAMILY PETITION (NVC)</option>
                <option>FAMILY PETITION (NVC + STATUS ADJUSTMENT)</option>
                <option>FAMILY PETITION INTERVIEW PREPARATION</option>
                <option>FINGERPRINTS</option>
                <option>FOIA</option>
                <option>HUMANITARIAN VISA</option>
                <option>HUMANITARIAN PAROLE</option>
                <option>I-589 FORM</option>
                <option>I-360 + I765 PETTION FOR SPECIAL IMMIGRANT</option>
                <option>I-485 ADJUSTMENT STATUS</option>
                <option>VISA U CERTIFICATION</option>
                <option>LEGAL CALL</option>
                <option>ORDER OF SUPERVISION</option>
                <option>REOPEN CASE</option>
                <option>REOPEN CASE + SKELETON I-589</option>
                <option>REQUEST FOR PAROLE</option>
                <option>SPECIAL IMMIGRANT JUVENILE</option>
                <option>STATUS ADJUSTMENT</option>
                <option>STAY OF REMOVAL</option>
                <option>TPS</option>
                <option>PAROLE IN PLACE</option>
                <option>PAROLE IN PLACE (I-131F)</option>
                <option>PROSECUTORIAL DISCRETION</option>
                <option>VAWA</option>
                <option>VISA FIANCE</option>
                <option>VISA U</option>
                <option>WAIVER</option>
                <option>WITHHOLDING OF REMOVAL</option>
                <option>WORK PERMIT</option>
                <option>WORK PERMIT RENEWAL</option>
                <option>PERMANENT RESIDENT CARD RENEWAL</option>
                <option>245-I</option>
                <option>REQUEST FILE</option>
                <option>ADVANCE PAROLE</option>
                <option>APPEARANCE AS ATTORNEY PROCEEDINGS IN USCIS</option>
                <option>
                  APPEARANCE AS ATTORNEY (CREDIBLE FEAR INTERVIEW), proceedings in Immigration and Customs Enforcement
                </option>
                <option>REPLACEMENT OF CITIZENSHIP</option>
                <option>REPRESENTATION OF USCIS PROCEEDINGS (I-730)</option>
                <option>VISA EXTENSION APPLICATION</option>
                <option>FAMILY PETITION (PIP)</option>
                <option>REQUEST FILE E-59</option>
                <option>ATTORNEY REPRESENTATION / BAIL REQUEST</option>
                <option>VOLUNTARY DEPARTURE</option>
                <option>REOPEN (STAY OF REMOVAL)</option>
                <option>APPEARANCE AS ATTORNEY (MOTION TO TERMINATED)</option>
                <option>APPEARANCE AS ATTORNEY WITH INTENT TO FILE A MOTION TO TERMINATED</option>
                <option>APPEARANCE AS ATTORNEY, proceedings in USCIS (CRBA)</option>
                <option>ATTORNEY REPRESENTATION / BAIL REQUEST + SKELETON I-589</option>
                <option>APPEARANCE AS ATTORNEY (REASONABLE FEAR INTERVIEW)</option>
                <option>DISMISSAL I-589 USCIS</option>
                <option>FAMILY PETITION (I-824)</option>
                <option>APPEARANCE AS ATTORNEY, proceedings in Immigration and Customs Enforcement</option>
                <option>ASYLUM APPOINTMENT RESCHEDULING</option>
                <option>APPEARANCE AS ATTORNEY (E-61)</option>
                <option>HABEAS CORPUS PETITION</option>
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
