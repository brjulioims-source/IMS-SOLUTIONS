import Swal from "sweetalert2";
import { useState } from "react";
import "./DerivadosForm.css";

export default function DerivadosForm({ formData, setFormData, setCurrentStep, closeModal }) {
  const [hasSpouse, setHasSpouse] = useState(formData.derivados?.hasSpouse || "");
  const [spouseName, setSpouseName] = useState(formData.derivados?.spouseName || "");
  const [hasChildren, setHasChildren] = useState(formData.derivados?.hasChildren || "");
  const [numChildren, setNumChildren] = useState(formData.derivados?.numChildren || 0);
  const [childrenNames, setChildrenNames] = useState(formData.derivados?.childrenNames || []);
  

  return (
    <form
      className="form derivados-grid"
      onSubmit={(e) => {
        e.preventDefault();
        if (!hasSpouse) {
          Swal.fire({ toast: true, icon: "error", title: "⚠️ Debe seleccionar si tiene esposo(a)", position: "bottom-end", showConfirmButton: false, timer: 2500 });
          return;
        }
        if (hasSpouse === "si" && !spouseName.trim()) {
          Swal.fire({ toast: true, icon: "error", title: "⚠️ Debe ingresar el nombre del esposo/a", position: "bottom-end", showConfirmButton: false, timer: 2500 });
          return;
        }
        if (!hasChildren) {
          Swal.fire({ toast: true, icon: "error", title: "⚠️ Debe seleccionar si tiene hijos", position: "bottom-end", showConfirmButton: false, timer: 2500 });
          return;
        }
        if (hasChildren === "si" && (!numChildren || numChildren <= 0)) {
          Swal.fire({ toast: true, icon: "error", title: "⚠️ Debe ingresar la cantidad de hijos", position: "bottom-end", showConfirmButton: false, timer: 2500 });
          return;
        }

        setFormData((prev) => ({
          ...prev,
          derivados: { hasSpouse, spouseName, hasChildren, numChildren, childrenNames },
        }));
        setCurrentStep(4);
        closeModal();
        Swal.fire({ toast: true, icon: "success", title: "✅ Derivados guardados con éxito", position: "bottom-end", showConfirmButton: false, timer: 2000 });
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
          <input type="text" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
        </label>
      )}

      <label>
        ¿Tienes hijos? *
        <select value={hasChildren} onChange={(e) => {
          setHasChildren(e.target.value);
          setChildrenNames([]);
          setNumChildren(e.target.value === "si" ? 1 : 0);
        }}>
          <option value="" disabled>Seleccione</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </label>

      {hasChildren === "si" && (
        <>
          <label>
            ¿Cuántos hijos tienes? *
            <input
              type="text"
              value={numChildren}
              min="1"
              max="12"
              onChange={(e) => {
                const value = Math.min(parseInt(e.target.value, 10) || 0, 12);
                setNumChildren(value);
                setChildrenNames(Array(value).fill(""));
              }}
            />
          </label>

          <div className="hijos-grid">
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
                />
              </label>
            ))}
          </div>
        </>
      )}

      <button type="submit" className="btn-guardar">Guardar</button>
    </form>
  );
}
