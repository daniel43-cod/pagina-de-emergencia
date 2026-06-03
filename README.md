# Página de Emergencia para Registro de Ventas

## Descripción

Este proyecto consiste en una página web desarrollada con HTML, CSS y JavaScript que permite gestionar productos y registrar ventas de forma rápida y sencilla. Fue creada como una solución temporal para el control de ventas y catálogo de productos, utilizando el almacenamiento local del navegador (LocalStorage) para guardar la información sin necesidad de una base de datos o servidor.

## Características

### Gestión de Productos

* Registro de productos.
* Registro opcional de imágenes.
* Modificación de productos existentes.
* Eliminación de productos.
* Visualización de productos registrados.

### Registro de Ventas

* Ingreso obligatorio del nombre del cliente.
* Búsqueda de productos mediante autocompletado.
* Registro de cantidad por producto.
* Aplicación de descuentos por producto.
* Cálculo automático de subtotales y total de la venta.
* Eliminación de productos del detalle de venta.
* Persistencia temporal de la venta al cambiar de página.

### Historial de Ventas

* Visualización de ventas registradas.
* Consulta del detalle de cada venta.
* Generación de comprobantes en formato PDF.
* Compartir información de la venta mediante WhatsApp.
* Eliminación individual de ventas.
* Eliminación completa del historial.

### Respaldo de Información

* Exportación de productos a formato JSON.
* Importación de productos desde archivos JSON.
* Exportación de ventas a formato JSON.
* Exportación de ventas a formato CSV compatible con Excel.

## Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript
* LocalStorage
* jsPDF
* GitHub Pages

## Estructura del Proyecto

* productos.html
* productos.js
* producto.css
* ventas.html
* ventas.js
* ventas.css
* historial.html
* historial.js

## Funcionamiento

Toda la información es almacenada localmente en el navegador mediante LocalStorage, permitiendo que los datos permanezcan disponibles incluso después de cerrar la página. Además, se incorporaron funciones de exportación e importación para facilitar la realización de respaldos y la recuperación de información.

## Estado del Proyecto

Proyecto desarrollado como solución temporal para la administración de productos y ventas, con posibilidad de evolucionar posteriormente hacia una arquitectura más robusta utilizando una API y una base de datos centralizada.
