let user = JSON.parse(localStorage.getItem('usuario')) || {};

// Para Cargar tabla de usuarios
// Traemos los usuarios
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let tableUser = document.querySelector('#tableUser');

// Traemos los productos
let productos = JSON.parse(localStorage.getItem('productos'));

let productTable = document.querySelector('#productTable');

if (user.id === 9999) {
  function cargarTablaUsuarios() {
    tableUser.innerHTML = '';

    usuarios.forEach(function (user) {
      let contenido = '';
      // Creo la etiqueta tr
      let tr = document.createElement('tr');
      if (user.usuario === 'admin') {
        // Cargo contenido
        contenido = `
        <th scope="row">${user.usuario}</th>
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td class="text-center">${user.activo}</td>     
        `;
      } else {
        contenido = `
            <th scope="row">${user.usuario}</th>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td class="text-center">${user.activo}</td>
            <td class="text-center">
            <a href="#" class="boton-${user.activo}" onclick="activarUser(${user.id})"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></a> 
            </td>`;
      }
      // Asignarle el tr al contenido
      tr.innerHTML = contenido;
      tableUser.appendChild(tr);
    });
  }

  function cargarTablaProductos() {
    productTable.innerHTML = '';

    productos.forEach(function (prod) {
      let contenido = '';
      let tr = document.createElement('tr');

      contenido = `
      <th scope="row">${prod.codigo}</th>
      <td>${prod.nombre}</td>
      <td>$${prod.precio}</td>
      <td class="text-center">${prod.stock}</td>
      <td class="text-center">
      <a href="#" class="btn btn-warning" onclick="modificarProd(${prod.codigo})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> 
      <a href="#" class="btn btn-danger" onclick="borrarProd(${prod.codigo})"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
      </td>
      `;

      tr.innerHTML = contenido;
      productTable.appendChild(tr);
    });
  }

  cargarTablaUsuarios();
  cargarTablaProductos();
} else {
  contenedor_principal.innerHTML = '';

  let contenido = `  <div class="row">
    <div class="col">
    <div class="alert alert-danger" role="alert">
    Acceso denegado! Debe loguearse como administrador.
  </div>
    </div>
  </div>`;

  contenedor_principal.innerHTML = contenido;
  setTimeout(function () {
    location.href = 'login.html';
  }, 3000);
}
