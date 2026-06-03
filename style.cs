body {
    font-family: Arial, sans-serif;
    background: #f2f2f2;
    margin: 0;
}

nav {
    background: #222;
    padding: 15px;
    text-align: center;
}

nav a {
    color: white;
    text-decoration: none;
    margin: 10px;
    font-weight: bold;
}

.contenedor {
    width: 90%;
    max-width: 900px;
    margin: 30px auto;
    background: white;
    padding: 25px;
    border-radius: 10px;
}

h1, h2 {
    text-align: center;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    padding: 12px;
    font-size: 16px;
}

button {
    padding: 12px;
    background: #0d6efd;
    color: white;
    border: none;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background: #084298;
}

.productos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.card {
    background: #fafafa;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
}

.card img {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 8px;
}

.card h3 {
    margin: 10px 0 5px;
}

.card p {
    font-weight: bold;
    color: green;
}

.btn-eliminar {
    background: crimson;
    margin-top: 10px;
}

.btn-eliminar:hover {
    background: darkred;
}