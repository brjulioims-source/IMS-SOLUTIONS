import "./DatosPersonalesForm.css";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function DatosPersonalesForm({ formData, handleSubmit }) {
  // ✅ Al montar el formulario, si ya hay información guardada, mostramos alerta
  useEffect(() => {
    if (formData.datosPersonales && Object.keys(formData.datosPersonales).length > 0) {
      Swal.fire({
        toast: true,
        icon: "info",
        title: "✅ Ya has llenado estos campos anteriormente",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2500
      });
    }
  }, [formData.datosPersonales]);

  return (
    <form
      className="form datos-form-grid"
      onSubmit={(e) =>
        handleSubmit(e, "datosPersonales", 2, [
          e.target[0].value,
          e.target[1].value,
          e.target[2].value,
          e.target[3].value,
          e.target[4].value,
          e.target[5].value,
          e.target[7].value,
        ])
      }
    >
      <div className="datos-personales-grid">
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
      </div>

      <button type="submit" className="btn-guardar">Guardar</button>
    </form>
  );
}
