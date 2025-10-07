import { useState} from "react";
import Modal from "../components/modal/Modal";
import DashboardLayout from "../layouts/DashboardLayout";
import StepProgress from "../components/StepProgress";
import Swal from "sweetalert2";
import "./FormSections.css";
import OficinasForm from "../components/forms/OficinasForm.jsx";
import DatosPersonalesForm from "../components/forms/DatosPersonalesForm.jsx";
import DerivadosForm from "../components/forms/DerivadosForm.jsx";
import TipoContratoForm from "../components/forms/TipoContratoForm.jsx";
import DownPaymentForm from "../components/forms/DownPaymentForm.jsx";
import PagodeSaldoForm from "../components/forms/PagodeSaldo.jsx";  


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
    downPayment: {},
    pagodeSaldo: {},
  });

  // -----------------------------
  // Lista de contratos (filtro y selección)
  // -----------------------------
  const contratos = [
    { nombre: "AFFIRMATIVE ASYLUM OUT OF THE YEAR (AA FUERA DEL AÑO)", precio: 10500, conyuge: 2000, hijos: 500, downpayment: 4000 },
    { nombre: "AFFIRMATIVE ASYLUM FOLLOW-UP + EVIDENCE PACKAGE", precio: 7000, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "ASYLUM INTERVIEW PREPARATION + EVIDENCE PACKAGE (Menos 30 días)", precio: 4000, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "APPEARANCE AS ATTORNET (CREDIBLE FEAR INTERVIEW), proceedings in ICE", precio: 3500, conyuge: null, hijos: null, downpayment: null },
    { nombre: "FAMILY PETITION INTERVIEW", precio: 2500, conyuge: null, hijos: null, downpayment: null },
    { nombre: "DEFENSIVE ASYLUM", precio: 12500, conyuge: 2000, hijos: 500, downpayment: 5000 },
    { nombre: "AFFIRMATIVE ASYLUM", precio: 10500, conyuge: 2000, hijos: 500, downpayment: 4000 },
    { nombre: "CANCELLATION OF REMOVAL", precio: 10500, conyuge: null, hijos: null, downpayment: 3500 },
    { nombre: "INDIVIDUAL COURT ATTORNEY REPRESENTATION (REPRESENTATION + AMENDMENT/RELIEF)", precio: 8500, conyuge: null, hijos: null, downpayment: 8500 },
    { nombre: "APPEARANCE AS ATTORNEY WITH INTENT TO FILE A MOTION TO TERMINATED", precio: 5000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "REPRESENTATION OF DETAINEES", precio: 5000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "REPRESENTATION OF ATTORNEY (E61)", precio: 2500, conyuge: null, hijos: null, downpayment: null },
    { nombre: "LEGAL CALL", precio: 1000, conyuge: null, hijos: null, downpayment: 1000 },
    { nombre: "ALTERNATIVE TO DETENTION", precio: 3000, conyuge: null, hijos: null, downpayment: 3000 },
    { nombre: "BOND", precio: 4500, conyuge: null, hijos: null, downpayment: 4500 },
    { nombre: "ATTORNEY REPRESENTATION / BAIL REQUEST", precio: 7000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "APPEAL (NEW CUSTOMER)", precio: 7000, conyuge: null, hijos: null, downpayment: 6500 },
    { nombre: "APPEAL (ACTIVE CLIENT)", precio: 4500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "REOPEN (STAY OF REMOVAL)", precio: 6000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "REOPEN + I-589 (NON-ACTIVE CUSTOMER)", precio: 6000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "REOPEN + I-589 (ACTIVE CUSTOMER)", precio: 5000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "REQUEST FILE E-59", precio: 3500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "LEGAL FAMILY PETITION", precio: 8000, conyuge: 1500, hijos: 1500, downpayment: 2500 },
    { nombre: "IRREGULAR COMPLETE FAMILY PETITION", precio: 9000, conyuge: null, hijos: 1500, downpayment: 2500 },
    { nombre: "PAROLE IN PLACE (ARMY) (NEW CUSTOMER)", precio: 3000, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "PAROLE IN PLACE (ARMY) (ACTIVE CLIENT)", precio: 2500, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "FAMILY PETITION FOR PIP (MILITARY)", precio: 7000, conyuge: 1500, hijos: 1500, downpayment: 2500 },
    { nombre: "IRREGULAR IMMEDIATE FAMILY PETITION (I - 130)", precio: 3000, conyuge: 1500, hijos: null, downpayment: 1500 },
    { nombre: "FAMILY PETITION (PREFERENCE CATEGORY I-130)", precio: 3000, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "FAMILY PETITION FOR ASYLUM OR REFUGEE (I-730)", precio: 3000, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "FAMILY PETITION STAGE 2 (CONSULAR PROCESS) NVC", precio: 4000, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "MINOR LAW (STAGE 1: ORDER OF DEPENDENCY)", precio: 5000, conyuge: null, hijos: null, downpayment: 3500 },
    { nombre: "MINOR LAW (STAGE 2: I-360 + I-765 PETITION FOR SPECIAL IMMIGRANT)", precio: 3500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "JUVENILE LAW (STAGE 3: I-485 ADJUSTMENT STATUS)", precio: 3500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "CUBAN ADJUSTMENT WITH NO CUT ADMISSION (I-485 STATUS ADJUSTMENT)", precio: 5000, conyuge: 1500, hijos: 1500, downpayment: 1500 },
    { nombre: "RESIDENCE / ADJUSTMENT OF STATUS", precio: 4500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "RESIDENCE (CARD RENEWAL OR LOSS)", precio: 2500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "RENEWAL OF RESIDENCY + WITHDRAWAL OF CONDITIONS (FOR. I-751)", precio: 3000, conyuge: null, hijos: null, downpayment: 3000 },
    { nombre: "STATUS ADJUSTEMENT + 245-I", precio: 5000, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "CITIZENSHIP PROCESS (N-400)", precio: 3500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "CITIZENSHIP PROCESS (N-600)", precio: 3500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "REPLACEMENT OF CITIZENSHIP", precio: 2000, conyuge: null, hijos: null, downpayment: 2000 },
    { nombre: "APPEARANCE AS ATTORNEY, proceedings in USCIS (CRBA)", precio: 2500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "VISA U CERTIFICATION", precio: 2000, conyuge: null, hijos: null, downpayment: 2000 },
    { nombre: "VISA U", precio: 5500, conyuge: 1500, hijos: 1500, downpayment: 1500 },
    { nombre: "VISA T", precio: 5500, conyuge: 1500, hijos: 1500, downpayment: 1500 },
    { nombre: "VAWA (CITIZEN)", precio: 6000, conyuge: null, hijos: 1500, downpayment: 1500 },
    { nombre: "VAWA (RESIDENT)", precio: 8000, conyuge: null, hijos: 1500, downpayment: 1500 },
    { nombre: "VISA FIANCE", precio: 2000, conyuge: null, hijos: 1500, downpayment: 1500 },
    { nombre: "WAIVER (IRREGULAR PRESENCE) I-601A", precio: 4000, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "WAIVER (FOR INADMISSIBILITY) I-601", precio: 4000, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "WAIVER (FOR DEPORTATION) I-212", precio: 4000, conyuge: null, hijos: null, downpayment: 2500 },
    { nombre: "RENOVACIÓN DACA", precio: 3500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "TPS (NEW CUSTOMER)", precio: 2500, conyuge: 2000, hijos: null, downpayment: 1500 },
    { nombre: "TPS (ACTIVE CLIENT)", precio: 2000, conyuge: 2000, hijos: null, downpayment: 1500 },
    { nombre: "REQUEST FOR USCIS", precio: 2000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "ADVANCE PAROLE", precio: 1500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "ORGANIZED DEPORTATION", precio: 3000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "VOLUNTARY DEPARTURE", precio: 3500, conyuge: null, hijos: null, downpayment: null },
    { nombre: "STAY OF REMOVAL", precio: 3500, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "WORK PERMIT", precio: 1620, conyuge: null, hijos: null, downpayment: 1500 },
    { nombre: "WORK PERMIT RENEWAL", precio: 870, conyuge: null, hijos: null, downpayment: 750 },
    { nombre: "FINGERPRINTS", precio: 1878, conyuge: null, hijos: null, downpayment: null },
    { nombre: "FOIA OUTSIDE THE US", precio: 880, conyuge: null, hijos: null, downpayment: 880 },
    { nombre: "FOIA", precio: 780, conyuge: null, hijos: null, downpayment: 780 },
    { nombre: "DISMISSAL I589 USCIS", precio: 5000, conyuge: null, hijos: null, downpayment: null },
    { nombre: "ASYLUM APPOINTMENT REDHEDULING", precio: 2500, conyuge: null, hijos: null, downpayment: null },
    { nombre: "ADJUSTMENT OF REFUGEE STATUS", precio: 4500, conyuge: 2000, hijos: 1500, downpayment: 1500 },
    { nombre: "ICE ACCOMPANIMENT BY LAWYER", precio: 2500, conyuge: null, hijos: null, downpayment: null },
  ];

  // -----------------------------
  // Helpers
  // -----------------------------
  const closeModal = () => setOpenModal(false);

  // Atajos para abrir modales con estado preparado
  const openOficinas = () => setOpenModal("oficinas");
  const openDatosPersonales = () => setOpenModal("datosPersonales");
  const openDerivados = () => setOpenModal("derivados");
  const openTipoContrato = () => setOpenModal("tipoContrato");
  const openDownPayment = () => setOpenModal("downPayment");
  const openPagodeSaldo = () => setOpenModal("pagodeSaldo");
  const openCartaMatrimonio = () => setOpenModal("cartaMatrimonio");
  const openCartaAudiencia = () => setOpenModal("cartaAudiencia");
  const openPagoTarjeta = () => setOpenModal("pagoTarjeta");

 
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
          <div className="section-card" onClick={openOficinas}>🏢 Oficinas</div>
          <div className="section-card" onClick={openDatosPersonales}>👤 Datos Personales</div>
          <div className="section-card" onClick={openDerivados}>👨‍👩‍👧 Derivados</div>
          <div className="section-card" onClick={openTipoContrato}>📑 Tipo de Contrato</div>
          <div className="section-card" onClick={openDownPayment}>💵 Down Payment</div>
          <div className="section-card" onClick={openPagodeSaldo}>💰 Pago de saldo</div>
          <div className="section-card" onClick={openCartaMatrimonio}>📜 Carta res. de matrimonio</div>
          <div className="section-card" onClick={openCartaAudiencia}>⚖️ Carta res. próxima audiencia</div>
          <div className="section-card" onClick={openPagoTarjeta}>💳 Pago con tarjeta digital</div>
        </div>

        {/* -------------------------------- */}
        {/* Modal Oficinas (Paso 1 -> 2)     */}
        {/* -------------------------------- */}
        
        <Modal isOpen={openModal === "oficinas"} onClose={closeModal} title="Formulario de Oficinas">
          <OficinasForm formData={formData} handleSubmit={handleSubmit} />
        </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Datos Personales (Paso 2 -> 3)       */}
        {/* ------------------------------------------ */}
        <Modal isOpen={openModal === "datosPersonales"} onClose={closeModal} title="Formulario de Datos Personales">
           <DatosPersonalesForm formData={formData} handleSubmit={handleSubmit} />
        </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Derivados (Paso 3 -> 4)              */}
        {/* ------------------------------------------ */}
        <Modal isOpen={openModal === "derivados"} onClose={closeModal} title="Formulario de Derivados">
          <DerivadosForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
        />
      </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Tipo de Contrato (Paso 4 -> 5)       */}
        {/* ------------------------------------------ */}
       <Modal
          isOpen={openModal === "tipoContrato"}
          onClose={closeModal}
          title="Formulario de Tipo de Contrato"
        >
          <TipoContratoForm
            formData={formData}
            contratos={contratos}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
            openModal={openModal} 
        />
      </Modal>
  
        {/* ------------------------------------------ */}
        {/* Modal Downpayment (Paso 5 -> 6)            */}
        {/* ------------------------------------------ */}
       <Modal isOpen={openModal === "downPayment"} onClose={closeModal} title="Formulario de Downpayment">
          <DownPaymentForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
            openModal={openModal}
        />
      </Modal>

        {/* ------------------------------------------ */}
        {/* Modal Pago de saldo (Paso 6 -> 7)          */}
        {/* ------------------------------------------ */}
        <Modal
          isOpen={openModal === "pagodeSaldo"}
          onClose={closeModal}
          title="Formulario de Pago de Saldo"
        >
          <PagodeSaldoForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
          />
        </Modal>



      </div>
    </DashboardLayout>
  );
}

export default FormSections;
