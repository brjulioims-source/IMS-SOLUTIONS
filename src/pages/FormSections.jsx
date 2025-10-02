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

  // -----------------------------
  // Estado global por secciones
  // -----------------------------
  const [formData, setFormData] = useState({
    oficinas: {},
    datosPersonales: {},
    derivados: {},
    tipoContrato: {},
    costo: {},
    observaciones: {},
  });

  // -----------------------------
  // Estados: Derivados
  // -----------------------------
  const [hasSpouse, setHasSpouse] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [hasChildren, setHasChildren] = useState("");
  const [childrenNames, setChildrenNames] = useState([]);
  const [numChildren, setNumChildren] = useState("");

  // -----------------------------
  // Estados: Tipo de Contrato (buscador)
  // -----------------------------
  const contratos = [
    "245-I",
    "ADVANCE PAROLE",
    "AFFIRMATIVE ASYLUM",
    "ALTERNATIVE TO DETENTION",
    "APPEAL",
    "APPEARANCE AS ATTORNEY",
    "APPEARANCE AS ATTORNEY (CREDIBLE FEAR INTERVIEW)",
    "APPEARANCE AS ATTORNEY (CREDIBLE FEAR INTERVIEW), proceedings in Immigration and Customs Enforcement",
    "APPEARANCE AS ATTORNEY (E-61)",
    "APPEARANCE AS ATTORNEY (MOTION TO TERMINATED)",
    "APPEARANCE AS ATTORNEY (REASONABLE FEAR INTERVIEW)",
    "APPEARANCE AS ATTORNEY PROCEEDINGS IN USCIS",
    "APPEARANCE AS ATTORNEY WITH INTENT TO FILE A MOTION TO TERMINATED",
    "APPEARANCE AS ATTORNEY, proceedings in Immigration and Customs Enforcement",
    "APPEARANCE AS ATTORNEY, proceedings in USCIS (CRBA)",
    "ASILO AFIRMATIVO FUERA DEL AÑO",
    "ASYLUM APPOINTMENT RESCHEDULING",
    "ATTORNEY REPRESENTATION / BAIL REQUEST",
    "ATTORNEY REPRESENTATION / BAIL REQUEST + SKELETON I-589",
    "BOND",
    "CANCELLATION OF REMOVAL",
    "CITIZENSHIP PROCESS (N-400)",
    "CITIZENSHIP PROCESS (N-600)",
    "CUBAN ADJUSTMENT",
    "DEFENSIVE ASYLUM",
    "DEPENDENCY ACTION",
    "DISMISSAL I-589 USCIS",
    "DOCUMENTARY REVIEW",
    "FAMILY PETITION",
    "FAMILY PETITION (I-130)",
    "FAMILY PETITION (I-824)",
    "FAMILY PETITION (NVC)",
    "FAMILY PETITION (NVC + STATUS ADJUSTMENT)",
    "FAMILY PETITION (PIP)",
    "FAMILY PETITION INTERVIEW PREPARATION",
    "FINGERPRINTS",
    "FOIA",
    "HABEAS CORPUS PETITION",
    "HUMANITARIAN PAROLE",
    "HUMANITARIAN VISA",
    "I-360 + I765 PETTION FOR SPECIAL IMMIGRANT",
    "I-485 ADJUSTMENT STATUS",
    "I-589 FORM",
    "LEGAL CALL",
    "ORDER OF SUPERVISION",
    "PERMANENT RESIDENT CARD RENEWAL",
    "PROSECUTORIAL DISCRETION",
    "REPLACEMENT OF CITIZENSHIP",
    "REOPEN (STAY OF REMOVAL)",
    "REOPEN CASE",
    "REOPEN CASE + SKELETON I-589",
    "REPRESENTATION OF USCIS PROCEEDINGS (I-730)",
    "REQUEST FILE",
    "REQUEST FILE E-59",
    "REQUEST FOR PAROLE",
    "SPECIAL IMMIGRANT JUVENILE",
    "STATUS ADJUSTMENT",
    "STAY OF REMOVAL",
    "TPS",
    "VAWA",
    "VISA EXTENSION APPLICATION",
    "VISA FIANCE",
    "VISA U",
    "VISA U CERTIFICATION",
    "VOLUNTARY DEPARTURE",
    "WAIVER",
    "WITHHOLDING OF REMOVAL",
    "WORK PERMIT",
    "WORK PERMIT RENEWAL",
  ];

  const [searchContrato, setSearchContrato] = useState("");
  const [selectedContrato, setSelectedContrato] = useState(
    formData.tipoContrato?.tipoContrato || ""
  );

  const contratosFiltrados = contratos.filter((c) =>
    c.toLowerCase().includes(searchContrato.toLowerCase())
  );

  // -----------------------------
  // Helpers
  // -----------------------------
  const closeModal = () => setOpenModal(false);

  // Validación genérica (para formularios simples)
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

    const data = Object.fromEntries(new FormData(e.target).entries());
    setFormData((prev) => ({ ...prev, [stepKey]: data }));

    setCurrentStep(stepNumber + 1);
    closeModal();

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

  // Control de apertura de modales por paso
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

        {/* -------------------------------- */}
        {/* Modal Oficinas (Paso 1 -> 2)     */}
        {/* -------------------------------- */}
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

            <button type="submit" className="btn-guardar">Guardar</button>
          </form>
        </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Datos Personales (Paso 2 -> 3)       */}
        {/* ------------------------------------------ */}
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
                e.target[0].value, // saludo
                e.target[1].value, // nombre
                e.target[2].value, // correo
                e.target[3].value, // telefono
                e.target[4].value, // direccion
                e.target[5].value, // pais
                e.target[7].value, // idioma nativo (ojo índice por el Alien Number)
              ])
            }
          >
            <label>
              Seleccione según aplique *
              <select name="saludo" defaultValue={formData.datosPersonales?.saludo || ""}>
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
              <select name="idioma" defaultValue={formData.datosPersonales?.idioma || ""}>
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

            <button type="submit" className="btn-guardar">Guardar</button>
          </form>
        </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Derivados (Paso 3 -> 4)              */}
        {/* ------------------------------------------ */}
        <Modal
          isOpen={openModal === "derivados"}
          onClose={closeModal}
          title="Formulario de Derivados (Esposo/a e Hijos)"
        >
          <form
            className="form form-grid"
            onSubmit={(e) => {
              e.preventDefault();

              // Validaciones
              if (!hasSpouse) {
                Swal.fire({ toast: true, position: "bottom-end", icon: "error", title: "⚠️ Debe seleccionar si tiene esposo(a) o no", showConfirmButton: false, timer: 2500, timerProgressBar: true });
                return;
              }
              if (hasSpouse === "si" && !spouseName.trim()) {
                Swal.fire({ toast: true, position: "bottom-end", icon: "error", title: "⚠️ Debe ingresar el nombre del esposo/a", showConfirmButton: false, timer: 2500, timerProgressBar: true });
                return;
              }
              if (!hasChildren) {
                Swal.fire({ toast: true, position: "bottom-end", icon: "error", title: "⚠️ Debe seleccionar si tiene hijos o no", showConfirmButton: false, timer: 2500, timerProgressBar: true });
                return;
              }
              if (hasChildren === "si") {
                if (!numChildren || numChildren <= 0) {
                  Swal.fire({ toast: true, position: "bottom-end", icon: "error", title: "⚠️ Debe ingresar la cantidad de hijos", showConfirmButton: false, timer: 2500, timerProgressBar: true });
                  return;
                }
                if (childrenNames.some((child) => !child.trim())) {
                  Swal.fire({ toast: true, position: "bottom-end", icon: "error", title: "⚠️ Debe ingresar todos los nombres de los hijos", showConfirmButton: false, timer: 2500, timerProgressBar: true });
                  return;
                }
              }

              const data = { hasSpouse, spouseName, hasChildren, numChildren, childrenNames };
              setFormData((prev) => ({ ...prev, derivados: data }));
              setCurrentStep(4);
              closeModal();

              Swal.fire({ toast: true, position: "bottom-end", icon: "success", title: "✅ Derivados guardados con éxito", showConfirmButton: false, timer: 2000, timerProgressBar: true });
            }}
          >
            <label>
              ¿Tienes esposo(a)? *
              <select value={hasSpouse} onChange={(e) => setHasSpouse(e.target.value)}>
                <option value="" disabled>Seleccione</option>
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
                <option value="" disabled>Seleccione</option>
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

            <button type="submit" className="btn-guardar">Guardar</button>
          </form>
        </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Tipo de Contrato (Paso 4 -> 5)       */}
        {/* ------------------------------------------ */}
        <Modal
          isOpen={openModal === "tipoContrato"}
          onClose={closeModal}
          title="Formulario de Tipo de Contrato"
        >
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!selectedContrato.trim()) {
                Swal.fire({ toast: true, position: "bottom-end", icon: "error", title: "⚠️ Debe seleccionar un contrato", showConfirmButton: false, timer: 2500, timerProgressBar: true });
                return;
              }
              setFormData((prev) => ({ ...prev, tipoContrato: { tipoContrato: selectedContrato } }));
              setCurrentStep(5);
              closeModal();

              Swal.fire({ toast: true, position: "bottom-end", icon: "success", title: "✅ Contrato guardado con éxito", showConfirmButton: false, timer: 2000, timerProgressBar: true });
            }}
          >
            <label>
              Por favor seleccione el contrato a generar *
              <input
                type="text"
                placeholder="Buscar contrato..."
                value={searchContrato}
                onChange={(e) => setSearchContrato(e.target.value)}
                className="input-search"
              />
            </label>

            <div className="select-list">
              {contratosFiltrados.length > 0 ? (
                contratosFiltrados.map((c, idx) => (
                  <div
                    key={idx}
                    className={`select-item ${selectedContrato === c ? "active" : ""}`}
                    onClick={() => {
                      // Si ya hay un contrato guardado en formData y selecciona otro distinto
                      if (formData.tipoContrato?.tipoContrato && formData.tipoContrato.tipoContrato !== c) {
                        Swal.fire({
                          title: "Ya guardaste un contrato",
                          text: `¿Quieres cambiarlo por "${c}"?`,
                          icon: "question",
                          showCancelButton: true,
                          confirmButtonText: "Sí, cambiar",
                          cancelButtonText: "No",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            setSelectedContrato(c);
                          }
                        });
                      } else {
                        // Si no había nada guardado o selecciona el mismo
                        setSelectedContrato(c);
                      }
                    }}
                  >
                    {c}
                  </div>
                ))
              ) : (
                <div className="select-empty">No se encontraron contratos</div>
              )}
            </div>
            <button type="submit" className="btn-guardar">Guardar</button>
          </form>
        </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Costo (Paso 5 -> 6)                  */}
        {/* ------------------------------------------ */}
        <Modal
          isOpen={openModal === "costo"}
          onClose={closeModal}
          title="Formulario de Costo"
        >
          <form
            className="form form-grid"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.target);
              const monto = (form.get("monto") || "").toString().trim();

              if (!monto) {
                Swal.fire({ toast: true, position: "bottom-end", icon: "error", title: "⚠️ Debe ingresar el monto", showConfirmButton: false, timer: 2500, timerProgressBar: true });
                return;
              }

              const data = Object.fromEntries(form.entries());
              setFormData((prev) => ({ ...prev, costo: data }));
              setCurrentStep(6);
              closeModal();

              Swal.fire({ toast: true, position: "bottom-end", icon: "success", title: "✅ Costo guardado con éxito", showConfirmButton: false, timer: 2000, timerProgressBar: true });
            }}
          >
            <label>
              Monto (USD) *
              <input name="monto" type="number" min="0" step="0.01" placeholder="Ej: 1200.00" defaultValue={formData.costo?.monto || ""} />
            </label>

            <label>
              Método de pago
              <select name="metodo" defaultValue={formData.costo?.metodo || ""}>
                <option value="">Seleccione</option>
                <option>Tarjeta</option>
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Otro</option>
              </select>
            </label>

            <label>
              Notas
              <input name="nota" type="text" placeholder="Opcional" defaultValue={formData.costo?.nota || ""} />
            </label>

            <button type="submit" className="btn-guardar">Guardar</button>
          </form>
        </Modal>

      {/* Modal Tipo de Contrato (Paso 4 -> 5) */}
      <Modal
        isOpen={openModal === "tipoContrato"}
        onClose={closeModal}
        title="Formulario de Tipo de Contrato"
      >
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!selectedContrato.trim()) {
              Swal.fire({
                toast: true,
                position: "bottom-end",
                icon: "error",
                title: "⚠️ Debe seleccionar un contrato",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
              });
              return;
            }
            setFormData((prev) => ({
              ...prev,
              tipoContrato: { tipoContrato: selectedContrato },
            }));
            setCurrentStep(5);
            closeModal();

            Swal.fire({
              toast: true,
              position: "bottom-end",
              icon: "success",
              title: "✅ Contrato guardado con éxito",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          }}
        >
          <label>
            Por favor seleccione el contrato a generar *
            <input
              type="text"
              placeholder="Buscar contrato..."
              value={searchContrato}
              onChange={(e) => setSearchContrato(e.target.value)}
              className="input-search"
            />
          </label>

          <div className="select-list">
            {contratosFiltrados.length > 0 ? (
              contratosFiltrados.map((c, idx) => (
                <div
                  key={idx}
                  className={`select-item ${selectedContrato === c ? "active" : ""}`}
                  onClick={() => setSelectedContrato(c)}
                >
                  {c}
                </div>
              ))
            ) : (
              <div className="select-empty">No se encontraron contratos</div>
            )}
          </div>

          {selectedContrato && (
            <p style={{ marginTop: "8px", fontSize: "14px", fontWeight: "500" }}>
              ✅ Contrato seleccionado: <strong>{selectedContrato}</strong>
            </p>
          )}

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
