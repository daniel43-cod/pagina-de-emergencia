let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarProducto() {
    let nombre = document.getElementById("nombre").value.trim();
    let precio = document.getElementById("precio").value;
    let imagenInput = document.getElementById("imagen");

    if (nombre === "" || precio === "") {
        alert("Complete el nombre y el precio");
        return;
    }

    if (imagenInput.files.length > 0) {
        let archivo = imagenInput.files[0];
        let lector = new FileReader();

        lector.onload = function(e) {
            guardarEnLocalStorage(nombre, precio, e.target.result);
        };

        lector.readAsDataURL(archivo);
    } else {
        guardarEnLocalStorage(nombre, precio, "sin-imagen.png");
    }
}

function guardarEnLocalStorage(nombre, precio, imagen) {
    let producto = {
        id: Date.now(),
        nombre: nombre,
        precio: parseFloat(precio),
        imagen: imagen
    };

    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));

    limpiarFormulario();
    mostrarProductos();
    alert("Producto guardado correctamente");
}

function mostrarProductos() {

     let texto =
        document.getElementById("buscarProducto")?.value
        ?.toLowerCase()
        ?.trim() || ""; 

    let lista =
        document.getElementById("listaProductos");

    lista.innerHTML = "";

    let filtrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    filtrados.forEach(producto => {

        let imagenHTML = "";

        if (
            producto.imagen &&
            producto.imagen !== "sin-imagen.png" &&
            producto.imagen !== ""
        ) {

            imagenHTML =
                `<img src="${producto.imagen}" alt="${producto.nombre}">`;

        } else {

            imagenHTML =
                `<div class="sin-imagen">
                    Sin imagen
                </div>`;
        }

        lista.innerHTML += `
            <div class="card">

                ${imagenHTML}

                <h3>${producto.nombre}</h3>

                <p>Q${Number(producto.precio).toFixed(2)}</p>

                <div class="acciones">

                    <button
                        class="btn-modificar"
                        onclick="modificarProducto(${producto.id})">

                        Modificar

                    </button>

                    <button
                        class="btn-eliminar"
                        onclick="eliminarProducto(${producto.id})">

                        Eliminar

                    </button>

                </div>

            </div>
        `;
    });
}

function eliminarProducto(id) {
    productos = productos.filter(producto => producto.id !== id);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("imagen").value = "";
}

mostrarProductos();

function modificarProducto(id) {

    let producto =
        productos.find(p => p.id === id);

    let nuevoNombre =
        prompt(
            "Nuevo nombre:",
            producto.nombre
        );

    if(nuevoNombre === null)
        return;

    let nuevoPrecio =
        prompt(
            "Nuevo precio:",
            producto.precio
        );

    if(nuevoPrecio === null)
        return;

    producto.nombre = nuevoNombre;
    producto.precio = parseFloat(nuevoPrecio);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarProductos();

    alert("Producto actualizado");
}


function exportarProductos() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    if(productos.length === 0){
        alert("No hay productos para exportar");
        return;
    }

    let datos =
        JSON.stringify(productos, null, 2);

    let blob =
        new Blob(
            [datos],
            { type: "application/json" }
        );

    let enlace =
        document.createElement("a");

    enlace.href =
        URL.createObjectURL(blob);

    enlace.download =
        "productos.json";

    enlace.click();

    URL.revokeObjectURL(enlace.href);
}
function importarProductos() {
    let archivo = document.getElementById("archivoImportar").files[0];

    if (!archivo) {
        alert("Seleccione un archivo JSON");
        return;
    }

    let lector = new FileReader();

    lector.onload = function(e) {
        try {
            let productosImportados = JSON.parse(e.target.result);

            let productosActuales =
                JSON.parse(localStorage.getItem("productos")) || [];

            productosImportados.forEach(p => {
                productosActuales.push({
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    nombre: p.nombre,
                    precio: Number(p.precio),
                    imagen: p.imagen || "sin-imagen.png"
                });
            });

            productos = productosActuales;

            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );

            mostrarProductos();


document.getElementById("archivoImportar").value = "";

            alert("Productos importados sin borrar los anteriores");
        }
        catch (error) {
            alert("El archivo no es un JSON válido");
        }
    };

    lector.readAsText(archivo);
}

