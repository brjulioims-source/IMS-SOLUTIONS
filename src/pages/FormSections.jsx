import { useState } from "react";
import Modal from "../components/modal/Modal";
import DashboardLayout from "../layouts/DashboardLayout";
import StepProgress from "../components/StepProgress";
import Swal from "sweetalert2";
import "./FormSections.css";

function FormSections() {
  const totalSteps = 7;
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
    faseDePago: {},
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
  // Estados: Tipo de Contrato
  // -----------------------------
  const [searchContrato, setSearchContrato] = useState("");
  const [selectedContrato, setSelectedContrato] = useState(null);

  // Estado para el descuento
  const [tieneDescuento, setTieneDescuento] = useState("no");
  const [autorizadoPor, setAutorizadoPor] = useState("");
  const [montoDescuento, setMontoDescuento] = useState(0);


  // -----------------------------
  // Lista de contratos (nombre + precio)
  // -----------------------------
  const contratos = [
  { nombre: "AFFIRMATIVE ASYLUM OUT OF THE YEAR (AA FUERA DEL AÑO)", precio: 10500, conyuge: 2000, hijo: 500 },
  { nombre: "AFFIRMATIVE ASYLUM FOLLOW-UP + EVIDENCE PACKAGE", precio: 7000, conyuge: null, hijo: null },
  { nombre: "ASYLUM INTERVIEW PREPARATION + EVIDENCE PACKAGE (Menos 30 días)", precio: 4000, conyuge: null, hijo: null },
  { nombre: "APPEARANCE AS ATTORNET (CREDIBLE FEAR INTERVIEW), proceedings in ICE", precio: 3500, conyuge: null, hijo: null },
  { nombre: "FAMILY PETITION INTERVIEW", precio: 2500, conyuge: null, hijo: null },
  { nombre: "DEFENSIVE ASYLUM", precio: 12500, conyuge: 2000, hijo: 500 },
  { nombre: "AFFIRMATIVE ASYLUM", precio: 10500, conyuge: 2000, hijo: 500 },
  { nombre: "CANCELLATION OF REMOVAL", precio: 10500, conyuge: null, hijo: null },
  { nombre: "INDIVIDUAL COURT ATTORNEY REPRESENTATION (REPRESENTATION + AMENDMENT/RELIEF)", precio: 8500, conyuge: null, hijo: null },
  { nombre: "APPEARANCE AS ATTORNEY WITH INTENT TO FILE A MOTION TO TERMINATED", precio: 5000, conyuge: null, hijo: null },
  { nombre: "REPRESENTATION OF DETAINEES", precio: 5000, conyuge: null, hijo: null },
  { nombre: "REPRESENTATION OF ATTORNEY (E61)", precio: 2500, conyuge: null, hijo: null },
  { nombre: "LEGAL CALL", precio: 1000, conyuge: null, hijo: null },
  { nombre: "ALTERNATIVE TO DETENTION", precio: 3000, conyuge: null, hijo: null },
  { nombre: "BOND", precio: 4500, conyuge: null, hijo: null },
  { nombre: "ATTORNEY REPRESENTATION / BAIL REQUEST", precio: 7000, conyuge: null, hijo: null },
  { nombre: "APPEAL (NEW CUSTOMER)", precio: 7000, conyuge: null, hijo: null },
  { nombre: "APPEAL (ACTIVE CLIENT)", precio: 4500, conyuge: null, hijo: null },
  { nombre: "REOPEN (STAY OF REMOVAL)", precio: 6000, conyuge: null, hijo: null },
  { nombre: "REOPEN + I-589 (NON-ACTIVE CUSTOMER)", precio: 6000, conyuge: null, hijo: null },
  { nombre: "REOPEN + I-589 (ACTIVE CUSTOMER)", precio: 5000, conyuge: null, hijo: null },
  { nombre: "REQUEST FILE E-59", precio: 3500, conyuge: null, hijo: null },
  { nombre: "LEGAL FAMILY PETITION", precio: 8000, conyuge: 1500, hijo: 1500 },
  { nombre: "IRREGULAR COMPLETE FAMILY PETITION", precio: 9000, conyuge: null, hijo: 1500 },
  { nombre: "PAROLE IN PLACE (ARMY) (NEW CUSTOMER)", precio: 3000, conyuge: null, hijo: null },
  { nombre: "PAROLE IN PLACE (ARMY) (ACTIVE CLIENT)", precio: 2500, conyuge: null, hijo: null },
  { nombre: "FAMILY PETITION FOR PIP (MILITARY)", precio: 7000, conyuge: 1500, hijo: 1500 },
  { nombre: "IRREGULAR IMMEDIATE FAMILY PETITION (I - 130)", precio: 3000, conyuge: 1500, hijo: null },
  { nombre: "FAMILY PETITION (PREFERENCE CATEGORY I-130)", precio: 3000, conyuge: null, hijo: null },
  { nombre: "FAMILY PETITION FOR ASYLUM OR REFUGEE (I-730)", precio: 3000, conyuge: null, hijo: null },
  { nombre: "FAMILY PETITION STAGE 2 (CONSULAR PROCESS) NVC", precio: 4000, conyuge: null, hijo: null },
  { nombre: "MINOR LAW (STAGE 1: ORDER OF DEPENDENCY)", precio: 5000, conyuge: null, hijo: null },
  { nombre: "MINOR LAW (STAGE 2: I-360 + I-765 PETITION FOR SPECIAL IMMIGRANT)", precio: 3500, conyuge: null, hijo: null },
  { nombre: "JUVENILE LAW (STAGE 3: I-485 ADJUSTMENT STATUS)", precio: 3500, conyuge: null, hijo: null },
  { nombre: "CUBAN ADJUSTMENT WITH NO CUT ADMISSION (I-485 STATUS ADJUSTMENT)", precio: 5000, conyuge: 1500, hijo: 1500 },
  { nombre: "RESIDENCE / ADJUSTMENT OF STATUS", precio: 4500, conyuge: null, hijo: null },
  { nombre: "RESIDENCE (CARD RENEWAL OR LOSS)", precio: 2500, conyuge: null, hijo: null },
  { nombre: "RENEWAL OF RESIDENCY + WITHDRAWAL OF CONDITIONS (FOR. I-751)", precio: 3000, conyuge: null, hijo: null },
  { nombre: "STATUS ADJUSTEMENT + 245-I", precio: 5000, conyuge: null, hijo: null },
  { nombre: "CITIZENSHIP PROCESS (N-400)", precio: 3500, conyuge: null, hijo: null },
  { nombre: "CITIZENSHIP PROCESS (N-600) (CIUDADANIA)", precio: 3500, conyuge: null, hijo: null },
  { nombre: "REPLACEMENT OF CITIZENSHIP", precio: 2000, conyuge: null, hijo: null },
  { nombre: "APPEARANCE AS ATTORNEY, proceedings in USCIS (CRBA)", precio: 2500, conyuge: null, hijo: null },
  { nombre: "VISA U CERTIFICATION", precio: 2000, conyuge: null, hijo: null },
  { nombre: "VISA U", precio: 5500, conyuge: 1500, hijo: 1500 },
  { nombre: "VISA T", precio: 5500, conyuge: 1500, hijo: 1500 },
  { nombre: "VAWA (CITIZEN)", precio: 6000, conyuge: null, hijo: 1500 },
  { nombre: "VAWA (RESIDENT)", precio: 8000, conyuge: null, hijo: 1500 },
  { nombre: "VISA FIANCE", precio: 2000, conyuge: null, hijo: 1500 },
  { nombre: "WAIVER (IRREGULAR PRESENCE) I-601A", precio: 4000, conyuge: null, hijo: null },
  { nombre: "WAIVER (FOR INADMISSIBILITY) I-601", precio: 4000, conyuge: null, hijo: null },
  { nombre: "WAIVER (FOR DEPORTATION) I-212", precio: 4000, conyuge: null, hijo: null },
  { nombre: "RENOVACIÓN DACA", precio: 3500, conyuge: null, hijo: null },
  { nombre: "TPS (NEW CUSTOMER)", precio: 2500, conyuge: 2000, hijo: null },
  { nombre: "TPS (ACTIVE CLIENT)", precio: 2000, conyuge: 2000, hijo: null },
  { nombre: "REQUEST FOR USCIS", precio: 2000, conyuge: null, hijo: null },
  { nombre: "ADVANCE PAROLE", precio: 1500, conyuge: null, hijo: null },
  { nombre: "ORGANIZED DEPORTATION", precio: 3000, conyuge: null, hijo: null },
  { nombre: "VOLUNTARY DEPARTURE", precio: 3500, conyuge: null, hijo: null },
  { nombre: "STAY OF REMOVAL", precio: 3500, conyuge: null, hijo: null },
  { nombre: "WORK PERMIT", precio: 1620, conyuge: null, hijo: null },
  { nombre: "WORK PERMIT RENEWAL", precio: 870, conyuge: null, hijo: null },
  { nombre: "FINGERPRINTS", precio: 1878, conyuge: null, hijo: null },
  { nombre: "FOIA OUTSIDE THE US", precio: 880, conyuge: null, hijo: null },
  { nombre: "FOIA", precio: 780, conyuge: null, hijo: null },
  { nombre: "DISMISSAL I589 USCIS", precio: 5000, conyuge: null, hijo: null },
  { nombre: "ASYLUM APPOINTMENT REDHEDULING", precio: 2500, conyuge: null, hijo: null },
  { nombre: "ADJUSTMENT OF REFUGEE STATUS", precio: 4500, conyuge: 2000, hijo: 1500 },
  { nombre: "ICE ACCOMPANIMENT BY LAWYER", precio: 2500, conyuge: null, hijo: null },
];


  const contratosFiltrados = contratos
  .filter((c) =>
    c.nombre.toLowerCase().includes(searchContrato.toLowerCase())
  )
  .sort((a, b) => a.nombre.localeCompare(b.nombre));

  // -----------------------------
  // Helpers
  // -----------------------------
  const closeModal = () => setOpenModal(false);

  // Atajos para abrir modales con estado preparado
  const openOficinas = () => setOpenModal("oficinas");
  const openDatosPersonales = () => setOpenModal("datosPersonales");
  const openDerivados = () => setOpenModal("derivados");
  const openFaseDePago = () => setOpenModal("faseDePago");
  const openObservaciones = () => setOpenModal("observaciones");

  const openTipoContrato = () => {
    // Inicializa la selección con lo ya guardado (si existe)
    if (formData.tipoContrato?.nombre) {
      setSelectedContrato(formData.tipoContrato);
    } else {
      setSelectedContrato(null);
    }
    setSearchContrato("");
    setOpenModal("tipoContrato");
  };

  // Validación genérica
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

  return (
    <DashboardLayout>
      <div>
        {/* Barra de progreso */}
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Secciones */}
        <div className="sections">
          <div className="section-card" onClick={openOficinas}>
            🏢 Oficinas
          </div>
          <div className="section-card" onClick={openDatosPersonales}>
            👤 Datos Personales
          </div>
          <div className="section-card" onClick={openDerivados}>
            👨‍👩‍👧 Derivados (Esposo/a e Hijos)
          </div>
          <div className="section-card" onClick={openTipoContrato}>
            📑 Tipo de Contrato
          </div>
          <div className="section-card" onClick={openFaseDePago}>
            💵 Fase de pago
          </div>
          <div className="section-card" onClick={openObservaciones}>
            💰 Pago de saldo
          </div>
          <div className="section-card" onClick={openObservaciones}>
            📜 Carta de matrimonio
          </div>
          <div className="section-card" onClick={openObservaciones}>
            ⚖️ Carta de corte próximo
          </div>
          <div className="section-card" onClick={openObservaciones}>
            💳 Pago con tarjeta digital
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
                e.target[7].value, // idioma
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
              if (!selectedContrato) {
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
                tipoContrato: selectedContrato,
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
            <label style={{ marginBottom: "12px", display: "block" }}>
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
                    className={`select-item ${
                      selectedContrato?.nombre === c.nombre ? "active" : ""
                    }`}
                    onClick={() => {
                      if (
                        formData.tipoContrato?.nombre &&
                        formData.tipoContrato.nombre !== c.nombre
                      ) {
                        Swal.fire({
                          title: "Ya guardaste un contrato",
                          text: `¿Quieres cambiarlo por "${c.nombre}"?`,
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
                        setSelectedContrato(c);
                      }
                    }}
                  >
                    {c.nombre} — ${c.precio}
                  </div>
                ))
              ) : (
                <div className="select-empty">No se encontraron contratos</div>
              )}
            </div>

            {/* Bloque de detalles y total */}
            {selectedContrato && (
              <div className="select-details">
                <p>
                  <strong>Contrato:</strong> {selectedContrato.nombre}
                </p>
                <p>Precio base: ${selectedContrato.precio}</p>

                {formData.derivados?.hasSpouse === "si" && (
                  <p>+ Cónyuge: ${selectedContrato.conyuge || 0}</p>
                )}

                {formData.derivados?.hasChildren === "si" &&
                  formData.derivados?.numChildren > 0 && (
                    <p>
                      + Hijos ({formData.derivados.numChildren}): $
                      {(selectedContrato.hijo || 0) *
                        formData.derivados.numChildren}
                    </p>
                  )}

                <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                  Total: $
                  {selectedContrato.precio +
                    (formData.derivados?.hasSpouse === "si"
                      ? selectedContrato.conyuge || 0
                      : 0) +
                    (formData.derivados?.hasChildren === "si" &&
                    formData.derivados?.numChildren
                      ? (selectedContrato.hijo || 0) *
                        formData.derivados.numChildren
                      : 0)}
                </p>
              </div>
            )}

            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </form>
        </Modal>



        {/* ------------------------------------------ */}
        {/* Modal Fase de Pago (Paso 5 -> 6)           */}
        {/* ------------------------------------------ */}
        <Modal
          isOpen={openModal === "faseDePago"}
          onClose={closeModal}
          title="Formulario de Fase de Pago"
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
              setFormData((prev) => ({ ...prev, faseDePago: data }));
              setCurrentStep(6);
              closeModal();

              Swal.fire({ toast: true, position: "bottom-end", icon: "success", title: "✅ Fase de Pago guardada con éxito", showConfirmButton: false, timer: 2000, timerProgressBar: true });
            }}
          >
            <label>
              Monto (USD) *
              <input name="monto" type="number" min="0" step="0.01" placeholder="Ej: 1200.00" defaultValue={formData.faseDePago?.monto || ""} />
            </label>

            <label>
              Método de pago
              <select name="metodo" defaultValue={formData.faseDePago?.metodo || ""}>
                <option value="">Seleccione</option>
                <option>Tarjeta</option>
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Otro</option>
              </select>
            </label>

            <label>
              Notas
              <input name="nota" type="text" placeholder="Opcional" defaultValue={formData.faseDePago?.nota || ""} />
            </label>

            <button type="submit" className="btn-guardar">Guardar</button>
          </form>
        </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Observaciones (Paso 6 -> 7)          */}
        {/* ------------------------------------------ */}
        <Modal
          isOpen={openModal === "observaciones"}
          onClose={closeModal}
          title="Observaciones"
        >
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.target).entries());
              setFormData((prev) => ({ ...prev, observaciones: data }));
              setCurrentStep(7);
              closeModal();
              Swal.fire({
                toast: true,
                position: "bottom-end",
                icon: "success",
                title: "✅ Observaciones guardadas",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
            }}
          >
            <label>
              Observaciones
              <textarea
                name="texto"
                rows="5"
                placeholder="Notas u observaciones adicionales"
                defaultValue={formData.observaciones?.texto || ""}
              />
            </label>

            <button type="submit" className="btn-guardar">Guardar</button>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default FormSections;
