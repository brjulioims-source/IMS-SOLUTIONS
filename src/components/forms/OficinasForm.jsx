import "../../pages/FormSections.css";
import Swal from "sweetalert2";

export default function OficinasForm({ formData, handleSubmit }) {
  return (
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
          <label key={oficina} className="oficina-card">
            <input
              type="radio"
              name="oficina"
              value={oficina}
              defaultChecked={formData.oficinas?.oficina === oficina}
            />
            <span>🏢 {oficina}</span>
          </label>
        ))}
      </div>

      <button type="submit" className="btn-guardar">Guardar</button>
    </form>
  );
}

// Al enviar el formulario, se llama a handleSubmit con los datos necesarios
// handleSubmit se encarga de validar y guardar los datos, y avanzar al siguiente paso
// Si no se selecciona ninguna oficina, se muestra una alerta usando SweetAlert2
// El botón "Guardar" envía el formulario