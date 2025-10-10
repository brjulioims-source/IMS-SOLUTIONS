import { useState } from "react";
import Swal from "sweetalert2";
import "./PagoTarjetaDigital.css";
import { useEffect } from "react";


function PagoTarjetaDigital({ formData, setFormData, closeModal, setCurrentStep }) {
  const [localData, setLocalData] = useState({
    nombrePropietario: formData.pagoTarjeta?.nombrePropietario || "",
    tipoPago: formData.pagoTarjeta?.tipoPago || "",
    fechaVencimiento: formData.pagoTarjeta?.fechaVencimiento || "",
    tipoTarjeta: formData.pagoTarjeta?.tipoTarjeta || "",
    tipoCuenta: formData.pagoTarjeta?.tipoCuenta || "",
    ultimos4: formData.pagoTarjeta?.ultimos4 || "",
    cvv: formData.pagoTarjeta?.cvv || "",
    codigoPostal: formData.pagoTarjeta?.codigoPostal || "",
    telefono: formData.pagoTarjeta?.telefono || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  // -----------------------------
  // useEffect para mostrar alerta si ya hay datos guardados
  // -----------------------------
  useEffect(() => {
    if (formData.pagoTarjeta && Object.keys(formData.pagoTarjeta).length > 0) {
      Swal.fire({
        toast: true,
        icon: "info",
        title: "✅ Ya has llenado estos campos anteriormente",
        position: "bottom-end", 
        showConfirmButton: false,
        timer: 2500
      });
    }
  }, [formData.pagoTarjeta]);

  const handleNumberInput = (e, field, maxLength) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      pagoTarjeta: localData
    }));
    closeModal();
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form className="pago-tarjeta-form" onSubmit={handleSubmit}>
      {/* Nombre */}
      <label>
        Nombre del propietario de la tarjeta *
        <input
          type="text"
          name="nombrePropietario"
          value={localData.nombrePropietario}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          required
        />
      </label>

      {/* Tipo de pago */}
      <label>
        ¿La autorización es para cargos recurrentes o único pago? *
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tipoPago"
              value="recurrente"
              checked={localData.tipoPago === "recurrente"}
              onChange={handleChange}
              required
            />
            Cargos recurrentes
          </label>
          <label>
            <input
              type="radio"
              name="tipoPago"
              value="unico"
              checked={localData.tipoPago === "unico"}
              onChange={handleChange}
            />
            Un único pago
          </label>
        </div>
      </label>

      {/* Fecha vencimiento */}
      <label>
        Fecha de vencimiento *
        <input
          type="month"
          name="fechaVencimiento"
          value={localData.fechaVencimiento}
          onChange={handleChange}
          required
        />
      </label>

      {/* Tipo de tarjeta */}
      <label>
        Tipo de tarjeta *
        <select
          name="tipoTarjeta"
          value={localData.tipoTarjeta}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="American Express">American Express</option>
          <option value="Discovery">Discovery</option>
          <option value="MasterCard">MasterCard</option>
          <option value="Visa">Visa</option>
        </select>
      </label>

      {/* Crédito o Débito */}
      <label>
        Tipo de cuenta *
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tipoCuenta"
              value="credito"
              checked={localData.tipoCuenta === "credito"}
              onChange={handleChange}
              required
            />
            Crédito
          </label>
          <label>
            <input
              type="radio"
              name="tipoCuenta"
              value="debito"
              checked={localData.tipoCuenta === "debito"}
              onChange={handleChange}
            />
            Débito
          </label>
        </div>
      </label>

      {/* Últimos 4 dígitos */}
      <label>
        Últimos 4 dígitos *
        <input
          type="text"
          value={localData.ultimos4}
          onChange={(e) => handleNumberInput(e, "ultimos4", 4)}
          placeholder="Ej: 1234"
          required
        />
      </label>

      {/* CVV */}
      <label>
        CVV *
        <input
          type="text"
          value={localData.cvv}
          onChange={(e) => handleNumberInput(e, "cvv", 4)}
          placeholder="Ej: 123"
          required
        />
      </label>

      {/* Código postal */}
      <label>
        Código postal *
        <input
          type="text"
          value={localData.codigoPostal}
          onChange={(e) => handleNumberInput(e, "codigoPostal", 10)}
          placeholder="Ej: 33010"
          required
        />
      </label>

      {/* Teléfono */}
      <label>
        Teléfono del dueño de la tarjeta *
        <input
          type="tel"
          value={localData.telefono}
          onChange={(e) => handleNumberInput(e, "telefono", 10)}
          placeholder="Ej: 1234567890"
          required
        />
      </label>

      <button type="submit" className="btn-guardar">
        Guardar y continuar
      </button>
    </form>
  );
}

export default PagoTarjetaDigital;
