import { useState } from "react";
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
import PagoTarjetaDigital from "../components/forms/PagoTarjetaDigita.jsx";

// 👇 Nueva importación del servicio
import { ContratosService } from "../services/contratosService";

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
    pagoTarjetaDigital: {},
  });

  // -----------------------------
  // Lista de contratos desde servicio
  // -----------------------------
  const contratos = ContratosService.lista;

  // -----------------------------
  // Helpers
  // -----------------------------
  const closeModal = () => setOpenModal(false);

  // Atajos para abrir modales
  const openOficinas = () => setOpenModal("oficinas");
  const openDatosPersonales = () => setOpenModal("datosPersonales");
  const openDerivados = () => setOpenModal("derivados");
  const openTipoContrato = () => setOpenModal("tipoContrato");
  const openDownPayment = () => setOpenModal("downPayment");
  const openPagodeSaldo = () => setOpenModal("pagodeSaldo");
  const openCartaMatrimonio = () => setOpenModal("cartaMatrimonio");
  const openPagoTarjeta = () => setOpenModal("pagoTarjetaDigital");

  // -----------------------------
  // Validación genérica
  // -----------------------------
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
          <div className="section-card" onClick={openCartaMatrimonio}>📜 Cartas</div>
          <div className="section-card" onClick={openPagoTarjeta}>💳 Pago con tarjeta digital</div>
        </div>

        {/* Modales */}
        <Modal isOpen={openModal === "oficinas"} onClose={closeModal} title="Formulario de Oficinas">
          <OficinasForm formData={formData} handleSubmit={handleSubmit} />
        </Modal>

        <Modal isOpen={openModal === "datosPersonales"} onClose={closeModal} title="Formulario de Datos Personales">
          <DatosPersonalesForm formData={formData} handleSubmit={handleSubmit} />
        </Modal>

        <Modal isOpen={openModal === "derivados"} onClose={closeModal} title="Formulario de Derivados">
          <DerivadosForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
          />
        </Modal>

        <Modal
          isOpen={openModal === "tipoContrato"}
          onClose={closeModal}
          title="Formulario de Tipo de Contrato">
          <TipoContratoForm
            formData={formData}
            contratos={contratos}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
            openModal={openModal}
          />
        </Modal>

        <Modal isOpen={openModal === "downPayment"} onClose={closeModal} title="Formulario de Downpayment">
          <DownPaymentForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
            openModal={openModal}
          />
        </Modal>

        <Modal
          isOpen={openModal === "pagodeSaldo"}
          onClose={closeModal}
          title="Formulario de Pago de Saldo">
          <PagodeSaldoForm
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            closeModal={closeModal}
          />
        </Modal>

        <Modal
          isOpen={openModal === "pagoTarjetaDigital"}
          onClose={closeModal}
          title="Formulario de Pago con Tarjeta Digital">
          <PagoTarjetaDigital
            formData={formData}
            setFormData={setFormData}
            closeModal={closeModal}
            setCurrentStep={setCurrentStep}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default FormSections;
