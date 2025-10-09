import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import "../../pages/FormSections.css";
import { generarContrato } from "../../components/utils/generarResumenContratoPDF";

export default function PagoSaldoForm({
  formData,
  setFormData,
  setCurrentStep,
  closeModal,
}) {
  const [montoMensual, setMontoMensual] = useState(0);
  const [numCuotas, setNumCuotas] = useState(0);
  const [cuotas, setCuotas] = useState([]);
  const [autorizadoPor, setAutorizadoPor] = useState("");
  const [saldoFinal, setSaldoFinal] = useState(0);
  const [autorizadoConfirmado, setAutorizadoConfirmado] = useState(false);
  const [exportarHabilitado, setExportarHabilitado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false); // bloquea si ya se guardó

  // ============================================================
  //   Cargar datos existentes si ya se guardó
  // ============================================================
  useEffect(() => {
    if (!formData.downPayment || formData.downPayment.estado !== "completo") {
      Swal.fire({
        icon: "error",
        title: "⚠️ No puede continuar",
        text: "Debe completar el pago del DownPayment antes de proceder.",
        confirmButtonText: "Entendido",
      });
      closeModal();
      return;
    }

    const totalContrato = formData.tipoContrato?.totalFinal || 0;
    const totalDown = formData.tipoContrato?.contrato?.downpayment || 0;
    setSaldoFinal(totalContrato - totalDown);

    // Si ya hay pago guardado → mostrar y bloquear
    if (formData.pagoSaldo?.estado === "completo") {
      const ps = formData.pagoSaldo;
      setMontoMensual(ps.montoMensual);
      setAutorizadoPor(ps.autorizadoPor || "");
      setCuotas(ps.cuotas || []);
      setNumCuotas(ps.cuotas?.length || 0);
      setExportarHabilitado(true);
      setBloqueado(true);
    }
  }, [formData, closeModal]);

  // ============================================================
  // 🔹 Sugerir fechas automáticas
  // ============================================================
  const sugerirFechas = (n) => {
    const hoy = new Date();
    const fechas = [];
    for (let i = 0; i < n; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(1);
      fecha.setMonth(hoy.getMonth() + i + 1);
      fechas.push(
        fecha.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }
    return fechas;
  };

  const calcularCuotas = (monto) => {
    if (!saldoFinal || monto <= 0) return [];
    const numPagos = Math.ceil(saldoFinal / monto);
    setNumCuotas(numPagos);

    const fechas = sugerirFechas(numPagos);
    return Array.from({ length: numPagos }, (_, i) => {
      let montoCuota = monto;
      if (i === numPagos - 1) {
        const totalParcial = monto * (numPagos - 1);
        montoCuota = saldoFinal - totalParcial;
      }
      return { monto: montoCuota, fecha: fechas[i] };
    });
  };

  // ============================================================
  //   Capitalizar nombre
  // ============================================================
  const capitalizarNombre = (nombre) =>
    nombre
      ? nombre
          .trim()
          .toLowerCase()
          .split(" ")
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(" ")
      : "";

  // ============================================================
  //   Calcular cuotas
  // ============================================================
  const handleMontoBlur = async () => {
    if (!montoMensual || montoMensual <= 0) return;

    if (montoMensual < 650 && !autorizadoConfirmado) {
      const result = await Swal.fire({
        icon: "warning",
        title: `⚠️ Monto mensual bajo ($${montoMensual})`,
        text: "¿Está autorizado este monto?",
        showCancelButton: true,
        confirmButtonText: "Sí, autorizado",
        cancelButtonText: "No",
      });

      if (!result.isConfirmed) {
        setMontoMensual(0);
        setCuotas([]);
        setAutorizadoPor("");
        return;
      }

      const { value: autorizado } = await Swal.fire({
        title: "Autorizado por:",
        input: "text",
        inputPlaceholder: "Nombre del autorizador",
        confirmButtonText: "Confirmar",
        inputValidator: (value) => {
          if (!value) return "Debe ingresar quién autorizó el monto.";
        },
      });

      setAutorizadoPor(capitalizarNombre(autorizado || ""));
      setAutorizadoConfirmado(true);
    }

    const nuevasCuotas = calcularCuotas(montoMensual);
    setCuotas(nuevasCuotas);
  };

  // ============================================================
  //   Guardar formulario
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (montoMensual < 650 && !autorizadoPor.trim()) {
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "⚠️ Autorización requerida",
        text: "Debe ingresar quién autorizó el monto mensual bajo.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      pagoSaldo: {
        cuotas,
        montoMensual,
        autorizadoPor,
        estado: "completo",
      },
    }));

    setExportarHabilitado(true);
    setBloqueado(true);

    setCurrentStep(7);
    closeModal();

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "✅ Pago de saldo guardado con éxito",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  // ============================================================
  //   Si intenta editar, preguntar confirmación
  // ============================================================
  const handleEditarIntento = async () => {
    if (bloqueado) {
      const confirm = await Swal.fire({
        icon: "question",
        title: "¿Desea editar el pago guardado?",
        text: "Esto permitirá modificar los valores del saldo.",
        showCancelButton: true,
        confirmButtonText: "Sí, quiero editar",
        cancelButtonText: "No",
      });

      if (confirm.isConfirmed) {
        setBloqueado(false); // ✅ desbloquea edición
        setExportarHabilitado(false); // opcional: desactiva exportar hasta guardar otra vez
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "info",
          title: "✏️ Edición habilitada",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  // ============================================================
  //   Render
  // ============================================================
  return (
    <form
      className="saldo-form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit(e);
        }
      }}
    >
      <div className="saldo-header">
        <p>
          💰 <strong>Saldo final a pagar:</strong> ${saldoFinal}
        </p>

        <label className="num-saldo">
          ¿Cuánto desea pagar por mes? (mínimo $650)
          <input
            type="text"
            value={montoMensual > 0 ? montoMensual : ""}
            placeholder="Ej: 1000"
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            }
            onChange={(e) => setMontoMensual(parseInt(e.target.value, 10) || 0)}
            onBlur={handleMontoBlur}
            readOnly={bloqueado}         //  sigue deshabilitado si no ha confirmado
            onClick={handleEditarIntento} //  esta línea permite preguntar para editar
          />
        </label>
      </div>

      {cuotas.length > 0 && (
        <>
          <div className="saldo-preview">
            <p>
              📅 <strong>Total de meses estimado:</strong> {numCuotas}
            </p>
            {autorizadoPor && (
              <p className="autorizado-info">
                ✅ <strong>Autorizado por:</strong> {autorizadoPor}
              </p>
            )}
          </div>

          <table className="saldo-tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha estimada</th>
                <th>Monto (USD)</th>
              </tr>
            </thead>
            <tbody>
              {cuotas.map((c, i) => (
                <tr key={i}>
                  <td data-label="Cuota">{i + 1}</td>
                  <td data-label="Fecha">{c.fecha}</td>
                  <td data-label="Monto">${c.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="botones-acciones">
        {!bloqueado && (
          <button type="submit" className="btn-guardar-saldo">
            Guardar
          </button>
        )}

        {/*   Nuevo botón para exportar contrato completo */}
        <button
          type="button"
          className="btn-contrato"
          onClick={() => generarContrato(formData, "contrato")}
          disabled={!exportarHabilitado}
          style={{
            opacity: exportarHabilitado ? 1 : 0.6,
            cursor: exportarHabilitado ? "pointer" : "not-allowed",
            marginLeft: "10px",
          }}
        >
          📝 Exportar Contrato Legal
        </button>
      </div>
    </form>
  );
}
