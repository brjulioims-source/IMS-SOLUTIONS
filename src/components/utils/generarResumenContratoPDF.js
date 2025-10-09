import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "../../components/forms/DownPaymentForm.jsx";
import "../../components/forms/DerivadosForm.jsx";
import "../../components/forms/DatosPersonalesForm.jsx";
import "../../components/forms/TipoContratoForm.jsx";
import "../../components/forms/OficinasForm.jsx";

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { getBinaryContent } from "pizzip/utils/index.js";

/* ==========================================================
   1️⃣ OPCIÓN: Resumen del contrato (jsPDF + autoTable)
   ========================================================== */
export const generarResumenContratoPDF = (formData) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Resumen del Contrato", 14, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Cliente: ${formData.datosPersonales?.nombre || "N/A"}`, 14, 35);
  doc.text(
    `Tipo de contrato: ${formData.tipoContrato?.contrato?.nombre || "N/A"}`,
    14,
    42
  );
  doc.text(
    `Total del contrato: $${formData.tipoContrato?.totalFinal || 0}`,
    14,
    49
  );

  if (formData.downPayment?.cuotas?.length > 0) {
    doc.text("DownPayment:", 14, 62);
    autoTable(doc, {
      startY: 66,
      head: [["#", "Monto (USD)", "Fecha"]],
      body: formData.downPayment.cuotas.map((c, i) => [
        i + 1,
        `$${c.monto}`,
        c.fecha,
      ]),
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229], textColor: 255 },
      styles: { halign: "center", fontSize: 11 },
    });
  }

  if (formData.pagoSaldo?.cuotas?.length > 0) {
    const startY = (doc.lastAutoTable?.finalY || 80) + 10;
    doc.text("Pagos de Saldo:", 14, startY);
    autoTable(doc, {
      startY: startY + 4,
      head: [["#", "Monto (USD)", "Fecha Estimada"]],
      body: formData.pagoSaldo.cuotas.map((c, i) => [
        i + 1,
        `$${c.monto}`,
        c.fecha,
      ]),
      theme: "striped",
      headStyles: { fillColor: [16, 185, 129], textColor: 255 },
      styles: { halign: "center", fontSize: 11 },
      foot: [
        [
          {
            content: `Total saldo: $${formData.pagoSaldo.cuotas.reduce(
              (acc, c) => acc + c.monto,
              0
            )}`,
            colSpan: 3,
            styles: {
              halign: "right",
              fontStyle: "bold",
              fillColor: [243, 244, 246],
            },
          },
        ],
      ],
    });
  }

  const yFinal = (doc.lastAutoTable?.finalY || 120) + 10;
  doc.text(
    `Autorizado por: ${formData.pagoSaldo?.autorizadoPor || "No aplica"}`,
    14,
    yFinal
  );

  const fecha = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Generado el ${fecha}`, 14, yFinal + 8);

  const nombreCliente =
    formData.datosPersonales?.nombre?.replace(/\s+/g, "_") || "Cliente";
  doc.save(`ResumenContrato_${nombreCliente}.pdf`);
};

/* ==========================================================
   2️⃣ OPCIÓN: Contrato legal completo (PLANTILLA.docx)
   ========================================================== */

function loadBinary(url) {
  return new Promise((resolve, reject) => {
    getBinaryContent(url, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Mapea los datos del formData al contrato
const mapCampos = (formData) => {
  const down = formData.downPayment?.cuotas || [];
  const saldo = formData.pagoSaldo?.cuotas || [];

  const meses = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];


  // Genera lista de pagos sin espacios adicionales
  const todo = [...down, ...saldo]
    .map((p, i) => {
      const fecha = new Date(p.fecha);
      const mes = meses[fecha.getMonth()];
      const dia = fecha.getDate();
      const year = fecha.getFullYear();
      const sufijo =
        dia === 1 ? "st" :
        dia === 2 ? "nd" :
        dia === 3 ? "rd" : "th";
      const monto = Number(p.monto).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      });

      const numerosEnPalabras = [
        "First", "Second", "Third", "Fourth", "Fifth", "Sixth",
        "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth",
        "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth",
      ];

      const indicePalabra =
        i < numerosEnPalabras.length ? numerosEnPalabras[i] : `${i + 1}th`;

      // Línea perfectamente limpia, sin dobles espacios ni tabulaciones
      return `${indicePalabra} payment: USD $${monto} due on ${mes} ${dia}${sufijo}, ${year}`;
    })
    .join("\n"); // doble salto entre líneas, idéntico al ejemplo oficial


  return {
    Cliente: formData.datosPersonales?.nombre || "",
    Derivado:
      formData.derivados?.esposo ||
      formData.derivados?.hijos?.map((h) => h.nombre).join(", ") ||
      "",
    Nacionalidad: formData.datosPersonales?.paisOrigen || "",
    FNacimiento: formData.datosPersonales?.fechaNacimiento || "",
    Nationality: formData.datosPersonales?.paisOrigen || "",
    TotalContrato: formData.tipoContrato?.totalFinal || "",
    dp1: formData.tipoContrato?.contrato?.downpayment || "",
    pagoMensual: formData.pagoSaldo?.montoMensual || "",
    Contrato: formData.tipoContrato?.contrato?.nombre || "",
    FechaFirma: new Date().toLocaleDateString(),
    Todo: todo || "",
  };
};

export async function exportContrato_DOCX(formData) {
  const vars = mapCampos(formData);
  try {
    const content = await loadBinary("/PLANTILLA.docx");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(vars);
    doc.render();

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const filename = `Contrato_${vars.Cliente || "cliente"}.docx`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(out);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error(e);
    alert("Error generando DOCX: " + (e.message || e));
  }
}

/* ==========================================================
    FUNCIÓN PRINCIPAL — Elige modo: 'resumen' o 'contrato'
   ========================================================== */
export function generarContrato(formData, modo = "resumen") {
  if (modo === "contrato") return exportContrato_DOCX(formData);
  return generarResumenContratoPDF(formData);
}
