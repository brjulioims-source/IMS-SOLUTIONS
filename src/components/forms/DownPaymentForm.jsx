import Swal from "sweetalert2";
import { useState } from "react";
import "../../pages/FormSections.css"; 

export default function DownPaymentForm({
  formData,
  setFormData,
  setCurrentStep,
  closeModal,
}) {
  const [numCuotas, setNumCuotas] = useState(0);
  const [cuotas, setCuotas] = useState([]);
  const [observaciones] = useState("");

  const totalDown = formData.tipoContrato?.contrato?.downpayment || 0;

  // ✅ función para obtener sugerencias dinámicas
  const getSuggestions = () => {
    const sumFilled = cuotas.reduce((a, c) => a + (c.monto || 0), 0);
    const remaining = Math.max(totalDown - sumFilled, 0);

    // índices vacíos (sin monto asignado)
    const emptyIdx = cuotas
      .map((q, i) => (q.monto > 0 ? null : i))
      .filter((i) => i !== null);

    const base = emptyIdx.length ? Math.floor(remaining / emptyIdx.length) : 0;
    const resto = emptyIdx.length ? remaining % emptyIdx.length : 0;

    const suggestionByIndex = {};
    emptyIdx.forEach((i, k) => {
      suggestionByIndex[i] = base + (k < resto ? 1 : 0);
    });

    return suggestionByIndex;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!totalDown) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "⚠️ Debe seleccionar un contrato con Downpayment",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    const cuotasValidas = cuotas.filter((c) => c.monto > 0);
    const totalCuotas = cuotasValidas.reduce((acc, c) => acc + c.monto, 0);

    if (cuotasValidas.some((c) => !c.fecha)) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "⚠️ Ingrese la fecha para cada cuota con monto",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }

    if (totalCuotas !== totalDown) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: `⚠️ El total ingresado ($${totalCuotas}) debe coincidir con el Downpayment ($${totalDown})`,
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      downPayment: { cuotas: cuotasValidas, observaciones, estado: "completo" },
    }));

    setCurrentStep(6);
    closeModal();

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "✅ Downpayment guardada con éxito",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // ✅ función que genera la vista previa
  const renderPreview = () => {
    if (cuotas.length === 0) return null;

    const totalCuotas = cuotas.reduce((acc, c) => acc + (c.monto || 0), 0);
    const diferencia = totalDown - totalCuotas;

    let previewClass = "total-preview";
    if (diferencia === 0) previewClass += " success";
    else if (diferencia > 0) previewClass += " warning";
    else previewClass += " error";

    return (
      <div className={previewClass}>
        <p>
          💰 <strong>Total ingresado:</strong> ${totalCuotas} / ${totalDown}
        </p>
        {diferencia > 0 && <span>⚠️ Faltan ${diferencia}</span>}
        {diferencia < 0 && <span>⚠️ Se pasó por ${Math.abs(diferencia)}</span>}
        {diferencia === 0 && <span>✅ Cuadra exacto</span>}
      </div>
    );
  };

  // Render principal
  return (
    <form className="form downpayment-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <p>
          💵 <strong>Downpayment total:</strong> ${totalDown}
        </p>
        <label className="num-cuotas">
          ¿En cuántas cuotas desea pagar? (máx. 6)
          <input
            type="text"
            value={numCuotas}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
            onChange={(e) => {
              const value = Math.min(parseInt(e.target.value, 10) || 0, 6);
              setNumCuotas(value);
              setCuotas(
                Array.from({ length: value }, () => ({ monto: 0, fecha: "" }))
              );
            }}
            placeholder="Ej: 3"
          />
        </label>
      </div>

      {/* Campos de cuotas */}
      {cuotas.length > 0 && (
        <div className="cuotas-grid">
          {cuotas.map((c, i) => {
            const suggestions = getSuggestions();
            const suggested = suggestions[i];

            return (
              <div key={i} className="cuota-card">
                <label>
                  Cuota {i + 1} (USD)
                  <input
                    type="text"
                    value={c.monto > 0 ? String(c.monto) : ""}
                    placeholder={
                      !c.monto && suggested > 0
                        ? `Sugerido: ${suggested}`
                        : "Ej: 1000"
                    }
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                    onChange={(e) => {
                      const newCuotas = [...cuotas];
                      newCuotas[i].monto = parseInt(e.target.value, 10) || 0;
                      setCuotas(newCuotas);
                    }}
                  />
                </label>
                <label>
                  Fecha
                  <input
                    type="date"
                    value={c.fecha}
                    onChange={(e) => {
                      const newCuotas = [...cuotas];
                      newCuotas[i].fecha = e.target.value;
                      setCuotas(newCuotas);
                    }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      )}

      {renderPreview()}

      <button type="submit" className="btn-guardar">
        Guardar
      </button>
    </form>
  );
}
// Al enviar el formulario, se valida que el total de las cuotas coincida con el Downpayment