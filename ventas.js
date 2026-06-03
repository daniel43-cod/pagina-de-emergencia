let productos = JSON.parse(localStorage.getItem("productos")) || [];
let detalleVenta = JSON.parse(localStorage.getItem("ventaTemporal")) || [];
let productoSeleccionado = null;

function guardarVentaTemporal() {
    localStorage.setItem(
        "ventaTemporal",
        JSON.stringify(detalleVenta)
    );
}

function buscarProductos() {

    let texto =
        document.getElementById("buscarProducto")
        .value
        .trim()
        .toLowerCase();

    let sugerencias =
        document.getElementById("sugerencias");

    sugerencias.innerHTML = "";

    productoSeleccionado = null;

    if(texto === "")
        return;

    let encontrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    if(encontrados.length === 0){

        sugerencias.innerHTML =
        `<div class="item-sugerencia">
            Producto no existe
        </div>`;

        return;
    }

    encontrados.forEach(producto => {

        sugerencias.innerHTML += `
            <div class="item-sugerencia"
                 onclick="seleccionarProducto(${producto.id})">

                ${producto.nombre}
                - Q${Number(producto.precio).toFixed(2)}

            </div>
        `;
    });
}

function seleccionarProducto(id){

    productoSeleccionado =
        productos.find(p => p.id === id);

    document.getElementById("buscarProducto").value =
        productoSeleccionado.nombre;

    document.getElementById("sugerencias").innerHTML = "";
}

function agregarDetalle(){

    let cliente =
        document.getElementById("cliente").value.trim();

    let cantidad =
        parseInt(document.getElementById("cantidad").value);

    if(cliente === ""){

        mostrarMensaje(
            "Debe ingresar el nombre del cliente",
            "red"
        );

        return;
    }

    if(productoSeleccionado === null){

        mostrarMensaje(
            "Debe seleccionar un producto existente",
            "red"
        );

        return;
    }

    if(isNaN(cantidad) || cantidad <= 0){

        mostrarMensaje(
            "Ingrese una cantidad válida",
            "red"
        );

        return;
    }

    let subtotal =
        productoSeleccionado.precio * cantidad;

   detalleVenta.push({
    idProducto: productoSeleccionado.id,
    producto: productoSeleccionado.nombre,
    precio: productoSeleccionado.precio,
    cantidad: cantidad,
    descuento: 0,
    subtotal: subtotal
});

    guardarVentaTemporal();

    document.getElementById("buscarProducto").value = "";
    document.getElementById("cantidad").value = "";

    productoSeleccionado = null;

    mostrarDetalle();

    mostrarMensaje(
        "Producto agregado",
        "green"
    );
}

function mostrarDetalle(){

    let tabla =
        document.getElementById("detalleVenta");

    tabla.innerHTML = "";

    let total = 0;

    detalleVenta.forEach((item,index)=>{

        let descuento = Number(item.descuento) || 0;
        let subtotalBruto = Number(item.precio) * Number(item.cantidad);
        item.subtotal = subtotalBruto - descuento;

        if(item.subtotal < 0){
            item.subtotal = 0;
        }

        total += item.subtotal;

        tabla.innerHTML += `
            <tr>
                <td>${item.producto}</td>

                <td>Q${Number(item.precio).toFixed(2)}</td>

                <td>${item.cantidad}</td>

                <td>
                    <input
                        type="number"
                        min="0"
                        value="${descuento}"
                        class="input-descuento"
                        oninput="actualizarDescuento(${index}, this.value)"
                    >
                </td>

                <td>Q${Number(item.subtotal).toFixed(2)}</td>

                <td>
                    <button
                        class="btn-eliminar"
                        onclick="quitarDetalle(${index})">
                        X
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalVenta").innerText =
        "Total: Q" + total.toFixed(2);

    guardarVentaTemporal();
}
function quitarDetalle(index){

    detalleVenta.splice(index,1);

    guardarVentaTemporal();

    mostrarDetalle();
}

function guardarVenta(){

    let ventaEditar =
    JSON.parse(localStorage.getItem("ventaEditar"));

    let cliente =
        document.getElementById("cliente").value.trim();

    if(cliente === ""){

        mostrarMensaje(
            "Debe ingresar el nombre del cliente",
            "red"
        );

        return;
    }

    if(detalleVenta.length === 0){

        mostrarMensaje(
            "Debe agregar productos a la venta",
            "red"
        );

        return;
    }

    let total =
        detalleVenta.reduce(
            (suma,item)=>suma + item.subtotal,
            0
        );

        let venta = {
          id: ventaEditar ? ventaEditar.venta.id : Date.now(),
          cliente: cliente,
          fecha: new Date().toLocaleString(),
          detalle: detalleVenta,
          total: total
         };

    let ventas =
        JSON.parse(
            localStorage.getItem("ventas")
        ) || [];

        if(ventaEditar){

         ventas[ventaEditar.index] = venta;

         localStorage.removeItem("ventaEditar");

          }else{

         ventas.push(venta);

          }
        


    

           localStorage.setItem(
           "ventas",
            JSON.stringify(ventas)
    );

    localStorage.removeItem("ventaTemporal");

    detalleVenta = [];

    document.getElementById("cliente").value = "";
    document.getElementById("buscarProducto").value = "";
    document.getElementById("cantidad").value = "";

    mostrarDetalle();

    mostrarMensaje(
        "Venta guardada correctamente",
        "green"
    );
}

function mostrarMensaje(texto,color){

    document.getElementById("mensaje").innerHTML =
    `
        <p style="
            color:${color};
            font-weight:bold;
        ">
            ${texto}
        </p>
    `;
}

function actualizarDescuento(index, valor){

    valor = valor.replace(/[^0-9.]/g, "");

    let descuento = Number(valor) || 0;

    let item = detalleVenta[index];

    let subtotalBruto =
        Number(item.precio) * Number(item.cantidad);

    if(descuento > subtotalBruto){
        descuento = subtotalBruto;
    }

    item.descuento = descuento;

    item.subtotal = subtotalBruto - descuento;

    guardarVentaTemporal();

    mostrarDetalle();
}


function cargarVentaEditar() {

    let datosEditar =
        JSON.parse(localStorage.getItem("ventaEditar"));

    if(!datosEditar)
        return;

    let venta = datosEditar.venta;

    document.getElementById("cliente").value =
        venta.cliente;

    detalleVenta = venta.detalle;

    guardarVentaTemporal();

    mostrarDetalle();
}

mostrarDetalle();
cargarVentaEditar();