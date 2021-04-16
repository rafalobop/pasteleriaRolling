class Producto {
  constructor(codigo, nombre, imagen, precio, stock){
    this.codigo = codigo
    this.nombre = nombre 
    this.imagen = imagen
    this.precio = precio
    this.stock = stock
  }
}

let user = JSON.parse(localStorage.getItem('usuario')) || {};

// Para Cargar tabla de usuarios
// Traemos los usuarios
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let tableUser = document.querySelector('#tableUser');

// Traemos los productos
let productos = JSON.parse(localStorage.getItem('productos'));

let productTable = document.querySelector('#productTable');

let bodyModificaModal = document. querySelector("#bodyModificaModal")


if (user.idReg === 9999) {
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
        <td>${user.usuario}</td>
        <td>${user.email}</td>
        <td class="text-center">${user.activo}</td>     
        `;
      } else {
        contenido = `
            <th scope="row">${user.usuario}</th>
            <td>${user.usuario}</td>
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

  function activarUser(id){
    let index = usuarios.findIndex(function(user){
      return user.id === id 
    })
    usuarios[index].activo = !usuarios[index].activo
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    cargarTablaUsuarios();

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

  function nuevoProducto(){
    nuevo = true;
    cargaModalModif();
    $('#modificarModal').modal('show')
  }

  function cargaModalModif(objecto = null){
    let contenido = ""
    let title = document.querySelector("#modificarModalLabel");

    // Si el objecto es null significa que es un producto nuevo
    if(objecto === null){

      contenido = `
    <div class="form-group">
    <label for="nombre">Producto</label>
    <input type="text" class="form-control" id="nombre" value="" autocomplete='off'>
  </div>
  <div class="form-group">
    <label for="imagen">Imagen</label>
    <input type="text" class="form-control" id="imagen" value="" autocomplete='off'>
  </div>
  <div class="form-row">
    <div class="col">
    <label for="precio">Precio</label>
    <input type="number"
    class="form-control"
    id="precio"
    value="0"
    min=0
    autocomplete='off'
    >
    </div>
    <div class="col">
    <label for="stock">Stock</label>
    <input type="number"
    class="form-control"
    id="stock"
    value="0"
    min=0
    autocomplete='off'
    >
    </div>
  </div>
  
    `;
    tittle.innerHTML = "Nuevo producto";
    //Si el objecto no es null entonces es un producto a modificar 
    }else{
      contenido = `
      <div class="form-group">
      <label for="nombre">Producto</label>
      <input type="text" class="form-control" id="nombre" value="${objeto.nombre}">
    </div>
    <div class="form-group">
      <label for="imagen">Imagen</label>
      <input type="text" class="form-control" id="imagen" value="${objeto.imagen}">
    </div>
    <div class="form-row">
      <div class="col">
      <label for="precio">Precio</label>
      <input type="number" 
      class="form-control" 
      id="precio" 
      value="${objeto.precio}"
      min=0
      >
      </div>
      <div class="col">
      <label for="stock">Stock</label>
      <input type="number" 
      class="form-control" 
      id="stock" 
      value="${objeto.stock}"
      min=0
      >
      </div>
    </div>
      
      `;
        title.innerHTML = "Modificar producto";
      }
       bodyModificaModal.innerHTML = contenido;
    }


    //----------------------------------------------

  //Mostrar modal del producto a modificar---------
  function modificarProd(codigo) {
    nuevo = false;
    producto = productos.find(function (prod) {
      return prod.codigo == codigo;
    });

    cargarModalModif(producto);

    $("#modificarModal").modal("show");
  }
  //--------------------------------------------------

  //Eliminar producto-----------------------------------
  function borrarProd(codigo) {
    let index = productos.findIndex(function (prod) {
      return prod.codigo === codigo;
    });

    let validar = confirm(`¿Seguro eliminará ${productos[index].nombre}?`);

    if (validar) {
      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      cargarTabla();
    }
  }
  //--------------------------------------------------

  //Submit formulario Modificar o nuevo-----------------------
   document
   .querySelector("#formModif")
   .addEventListener("submit", function (event) {
     event.preventDefault();

     let codigo = new Date().getTime();
     let nombre = document.querySelector("#nombre").value;
     let imagen = document.querySelector("#imagen").value;
     let precio = document.querySelector("#precio").value;
     let stock = document.querySelector("#stock").value;

     if (imagen === "") {
       imagen = "https://bitsofco.de/content/images/2018/12/broken-1.png";
     }

     if(nuevo){
      let newProduct = new Producto(codigo, nombre, imagen, precio, stock);
      productos.push(newProduct);
     }else{
       // Si no es un producto a modificar 
       let index = productos.findIndex(function (prod) {
        return prod.codigo === producto.codigo;
      });
      productos[index].nombre = nombre;
      productos[index].imagen = imagen;
      productos[index].precio = precio;
      productos[index].stock = stock;
    }
     
     localStorage.setItem("productos", JSON.stringify(productos));

     cargarTablaProductos();
     $("#modificarModal").modal("hide");
   });


  
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

