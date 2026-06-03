let categorias =
    JSON.parse(localStorage.getItem("categorias")) || [];

function guardarCategoria() {
    let categoria =
        document.getElementById("nuevaCategoria").value.trim();

    if (categoria === "") {
        alert("Ingrese una categoría");
        return;
    }

    let existe = categorias.some(c =>
        c.toLowerCase() === categoria.toLowerCase()
    );

    if (existe) {
        alert("Esa categoría ya existe");
        return;
    }

    categorias.push(categoria);

    localStorage.setItem(
        "categorias",
        JSON.stringify(categorias)
    );

    document.getElementById("nuevaCategoria").value = "";

    mostrarCategorias();
}

function modificarCategoria(index) {
    let categoriaAnterior = categorias[index];

    let nueva =
        prompt("Modificar categoría", categoriaAnterior);

    if (nueva === null || nueva.trim() === "") {
        return;
    }

    nueva = nueva.trim();

    categorias[index] = nueva;

    localStorage.setItem(
        "categorias",
        JSON.stringify(categorias)
    );

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    productos.forEach(producto => {
        if (producto.categoria === categoriaAnterior) {
            producto.categoria = nueva;
        }
    });

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarCategorias();

    document.getElementById("listaProductosCategoria").innerHTML =
        `<p>Seleccione una categoría y presione "Ver".</p>`;
}

function mostrarCategorias() {
    let lista =
        document.getElementById("listaCategorias");

    lista.innerHTML = "";

    categorias.forEach((categoria, index) => {
        lista.innerHTML += `
            <div class="card-categoria">

                <span>${categoria}</span>

                <button onclick="modificarCategoria(${index})">
                    Modificar
                </button>

                <button onclick="verProductosCategoria('${categoria}')">
                    Ver
                </button>

            </div>
        `;
    });
}

function verProductosCategoria(categoria) {
    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    let lista =
        document.getElementById("listaProductosCategoria");

    lista.innerHTML = `
        <h3>Categoría: ${categoria}</h3>
    `;

    let filtrados = productos.filter(producto =>
        producto.categoria === categoria
    );

    if (filtrados.length === 0) {
        lista.innerHTML += `
            <p>No hay productos registrados en esta categoría.</p>
        `;
        return;
    }

    filtrados.forEach(producto => {
        lista.innerHTML += `
            <div class="card-producto-categoria">

                <h4>${producto.nombre}</h4>

                <p>Q${Number(producto.precio).toFixed(2)}</p>

            </div>
        `;
    });
}

mostrarCategorias();