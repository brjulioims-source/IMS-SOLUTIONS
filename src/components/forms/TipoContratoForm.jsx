import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../pages/FormSections.css"; 

export default function TipoContratoForm({
  formData,
  contratos,
  setFormData,
  setCurrentStep,
  closeModal,
  openModal, 
}) {
  // -----------------------------
  // Estados locales
  // -----------------------------
  const [searchContrato, setSearchContrato] = useState("");
  const [selectedContrato, setSelectedContrato] = useState(
    formData.tipoContrato?.contrato || null
  );
  const [tieneDescuento, setTieneDescuento] = useState(
    formData.tipoContrato?.tieneDescuento || "no"
  );
  const [autorizadoPor, setAutorizadoPor] = useState(
    formData.tipoContrato?.autorizadoPor || ""
  );
  const [montoDescuento, setMontoDescuento] = useState(
    formData.tipoContrato?.montoDescuento || 0
  );

  // -----------------------------
  // useEffect para sincronizar al abrir modal
  // -----------------------------
  useEffect(() => {
    if (openModal === "tipoContrato" && formData.tipoContrato) {
      setSelectedContrato(formData.tipoContrato.contrato || null);
      setTieneDescuento(formData.tipoContrato.tieneDescuento || "no");
      setAutorizadoPor(formData.tipoContrato.autorizadoPor || "");
      setMontoDescuento(formData.tipoContrato.montoDescuento || 0);
    }
  }, [openModal, formData]);

  // -----------------------------
  // Función para calcular total
  // -----------------------------
  const calcularTotal = () => {
    if (!selectedContrato) return 0;

    let total = selectedContrato.precio;

    // cónyuge
    if (formData.derivados?.hasSpouse === "si" && selectedContrato.conyuge) {
      total += selectedContrato.conyuge;
    }

    // hijos
    if (formData.derivados?.hasChildren === "si" && selectedContrato.hijos) {
      const cantidadHijos = Number(formData.derivados.numChildren) || 0;
      total += cantidadHijos * selectedContrato.hijos;
    }

    // descuento
    if (tieneDescuento === "si" && montoDescuento > 0) {
      total -= montoDescuento;
    }

    return total;
  };

  // -----------------------------
  // Contratos filtrados
  // -----------------------------
  const contratosFiltrados = contratos
    .filter((c) =>
      c.nombre.toLowerCase().includes(searchContrato.toLowerCase())
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  // -----------------------------
  // Guardar formulario
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedContrato) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "⚠️ Debe seleccionar un contrato",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    const totalFinal = calcularTotal();

    setFormData((prev) => ({
      ...prev,
      tipoContrato: {
        contrato: selectedContrato,
        tieneDescuento,
        autorizadoPor,
        montoDescuento,
        totalFinal,
      },
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
    });
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <form className="form contrato-form" onSubmit={handleSubmit}>
      {/* Buscar contrato */}
      <label className="label-buscar">
        <span>Por favor seleccione el contrato a generar *</span>
        <input
          type="text"
          placeholder="Buscar contrato..."
          value={searchContrato}
          onChange={(e) => setSearchContrato(e.target.value)}
          className="input-search"
        />
      </label>

      {/* Lista de contratos */}
      <div className="select-list">
        {contratosFiltrados.length > 0 ? (
          contratosFiltrados.map((c, idx) => (
            <div
              key={idx}
              className={`select-item ${
                selectedContrato?.nombre === c.nombre ? "active" : ""
              }`}
              onClick={() => setSelectedContrato(c)}
            >
              <strong>{c.nombre}</strong> — ${c.precio}
            </div>
          ))
        ) : (
          <div className="select-empty">No se encontraron contratos</div>
        )}
      </div>

      {/* Detalle del contrato */}
      {selectedContrato && (
        <>
          <div className="contrato-detalle">
            <h4>{selectedContrato.nombre}</h4>
            <p>
              <strong>Precio base:</strong> ${selectedContrato.precio}
            </p>

            <div className="extras">
              {selectedContrato.conyuge &&
                formData.derivados?.hasSpouse === "si" && (
                  <p className="extra-item">
                    👩‍❤️‍👨 Cónyuge: ${selectedContrato.conyuge}
                  </p>
                )}
              {selectedContrato.hijos &&
                formData.derivados?.hasChildren === "si" && (
                  <p className="extra-item">
                    👶 Hijos: $
                    {(formData.derivados?.numChildren || 0) *
                      selectedContrato.hijos}
                  </p>
                )}
              {selectedContrato.downpayment && (
                <p className="extra-item">
                  💵 Downpayment: ${selectedContrato.downpayment}
                </p>
              )}
            </div>
          </div>

          {/* Descuento */}
          <label className="label-descuento">
            ¿Tiene descuento?
            <select
              value={tieneDescuento}
              onChange={(e) => setTieneDescuento(e.target.value)}
            >
              <option value="no">No</option>
              <option value="si">Sí</option>
            </select>
          </label>

          {tieneDescuento === "si" && (
            <div className="descuento-grid">
              <label>
                Autorizado por:
                <input
                  type="text"
                  placeholder="Nombre del autorizador"
                  value={autorizadoPor}
                  onChange={(e) => setAutorizadoPor(e.target.value)}
                />
              </label>

              <label>
                Monto del descuento (USD):
                <input
                  type="number"
                  min="0"
                  value={montoDescuento}
                  onChange={(e) => setMontoDescuento(Number(e.target.value))}
                />
              </label>
            </div>
          )}

          {/* Total final */}
          <p className="total-final">
            💰 <strong>Total a pagar:</strong> ${calcularTotal()}
            {tieneDescuento === "si" && autorizadoPor && (
              <span className="total-autorizado">
                (Autorizado por: {autorizadoPor})
              </span>
            )}
          </p>
        </>
      )}

      <button type="submit" className="btn-guardar">
        Guardar
      </button>
    </form>
  );
}
