let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
console.log("Ventas guardadas:", ventas);

function mostrarHistorial() {
    let tabla = document.getElementById("tablaHistorial");
    tabla.innerHTML = "";

    ventas.forEach((venta, index) => {
        let detalle = venta.detalle || [];

        tabla.innerHTML += `
            <tr>
                <td>${venta.cliente || "Sin cliente"}</td>
                <td>${venta.fecha}</td>
                <td>Q${Number(venta.total).toFixed(2)}</td>
                <td><button onclick="verDetalle(${index})">Ver detalle</button></td>
                <td><button onclick="generarPDF(${index})">Generar PDF</button></td>
                <td><button onclick="compartirWhatsApp(${index})">Compartir</button></td>
            </tr>

            <tr id="detalle-${index}" style="display:none;">
                <td colspan="6">
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detalle.map(item => `
                                <tr>
                                    <td>${item.producto}</td>
                                    <td>Q${Number(item.precio).toFixed(2)}</td>
                                    <td>${item.cantidad}</td>
                                    <td>Q${Number(item.subtotal).toFixed(2)}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </td>
            </tr>
        `;
    });
}

function verDetalle(index) {
    let fila = document.getElementById(`detalle-${index}`);

    if (fila.style.display === "none") {
        fila.style.display = "table-row";
    } else {
        fila.style.display = "none";
    }
}

function generarPDF(index) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let venta = ventas[index];

    doc.setFontSize(16);
    doc.text("Detalle de Venta", 20, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${venta.cliente}`, 20, 35);
    doc.text(`Fecha: ${venta.fecha}`, 20, 45);

    let y = 60;

    venta.detalle.forEach(item => {
        doc.text(
            `${item.producto} | Cant: ${item.cantidad} | Q${item.subtotal.toFixed(2)}`,
            20,
            y
        );
        y += 10;
    });

    doc.text(`Total: Q${venta.total.toFixed(2)}`, 20, y + 10);

    doc.save(`venta_${venta.cliente}.pdf`);
}

function compartirWhatsApp(index) {
    let venta = ventas[index];

    let mensaje = `Detalle de venta%0A`;
    mensaje += `Cliente: ${venta.cliente}%0A`;
    mensaje += `Fecha: ${venta.fecha}%0A%0A`;

    venta.detalle.forEach(item => {
        mensaje += `${item.producto} - Cant: ${item.cantidad} - Q${item.subtotal.toFixed(2)}%0A`;
    });

    mensaje += `%0ATotal: Q${venta.total.toFixed(2)}`;

    window.open(`https://wa.me/?text=${mensaje}`, "_blank");
}

mostrarHistorial();