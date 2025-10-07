import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import "../../pages/FormSections.css";

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

  // ✅ Validar que el downpayment esté completo
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
  }, [formData, closeModal]);

  // ✅ Validar que haya pasado al menos un mes desde el último pago
  const validarMesUltimoPago = () => {
    const cuotasDown = formData.downPayment?.cuotas || [];
    if (cuotasDown.length === 0) return true;

    const ultimaFecha = cuotasDown[cuotasDown.length - 1].fecha;
    if (!ultimaFecha) return true;

    const fechaUltimoPago = new Date(ultimaFecha);
    const hoy = new Date();

    const diferenciaMeses =
      hoy.getMonth() - fechaUltimoPago.getMonth() +
      12 * (hoy.getFullYear() - fechaUltimoPago.getFullYear());

    if (diferenciaMeses < 1) {
      Swal.fire({
        icon: "warning",
        title: "⏳ No ha pasado un mes desde el último pago",
        text: "Debe esperar al menos un mes desde la última cuota del DownPayment.",
      });
      return false;
    }

    return true;
  };

  // ✅ Sugerir fechas (día 1 de cada mes siguiente)
  const sugerirFechas = (n) => {
    const hoy = new Date();
    const fechas = [];
    for (let i = 0; i < n; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(1);
      fecha.setMonth(hoy.getMonth() + i + 1);
      fechas.push(fecha.toISOString().split("T")[0]); // formato ISO para almacenar
    }
    return fechas;
  };

  // ✅ Calcular cuotas automáticas según el monto mensual
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

  // ✅ Convertir fecha ISO a formato mm/dd/aaaa
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${mes}/${dia}/${año}`;
  };

  // ✅ Cuando el usuario termina de ingresar el monto (onBlur)
  const handleMontoBlur = async () => {
    if (!montoMensual || montoMensual <= 0) return;

    if (montoMensual < 650) {
      const result = await Swal.fire({
        icon: "warning",
        title: "⚠️ Monto mensual bajo",
        text: "El monto mensual es menor a $650. ¿Está autorizado?",
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

      setAutorizadoPor(autorizado || "");
    }

    const nuevasCuotas = calcularCuotas(montoMensual);
    setCuotas(nuevasCuotas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarMesUltimoPago()) return;

    if (montoMensual < 650 && !autorizadoPor.trim()) {
      Swal.fire({
        icon: "error",
        title: "⚠️ Autorización requerida",
        text: "Debe ingresar quién autorizó el monto mensual bajo.",
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

    setCurrentStep(7);
    closeModal();

    Swal.fire({
      toast: true,
      position: "bottom-end",
      icon: "success",
      title: "✅ Pago de saldo guardado con éxito",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <form className="saldo-form" onSubmit={handleSubmit}>
      {/* Header principal */}
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
          />
        </label>
      </div>

      {/* Cuotas en formato tabla */}
      {cuotas.length > 0 && (
        <>
          <div className="saldo-preview">
            <p>
              📅 <strong>Total de meses estimado:</strong> {numCuotas}
            </p>
          </div>

          <table className="saldo-tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha estimada</th>
                <th>Monto a pagar (USD)</th>
              </tr>
            </thead>
            <tbody>
              {cuotas.map((c, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{formatearFecha(c.fecha)}</td>
                  <td>${c.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Autorización manual si aplica */}
      {montoMensual > 0 && montoMensual < 650 && !autorizadoPor && (
        <label>
          Autorizado por:
          <input
            type="text"
            placeholder="Nombre del autorizador"
            value={autorizadoPor}
            onChange={(e) => setAutorizadoPor(e.target.value)}
          />
        </label>
      )}

      <button type="submit" className="btn-guardar">
        Guardar
      </button>
    </form>
  );
}
