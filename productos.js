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
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos.forEach(producto => {
        lista.innerHTML += `
            <div class="card">
                <img src="${producto.imagen}" onerror="this.src='https://via.placeholder.com/150?text=Sin+imagen'">
                <h3>${producto.nombre}</h3>
                <p>Q${producto.precio.toFixed(2)}</p>
               <div class="acciones">
    <button class="btn-modificar"
        onclick="modificarProducto(${producto.id})">
        Modificar
    </button>

    <button class="btn-eliminar"
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