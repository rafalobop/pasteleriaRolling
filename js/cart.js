class Producto {
  constructor(codigo, nombre, precio, imagen, stock) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.stock = stock;
  }
}

let productos = JSON.parse(localStorage.getItem('productos')) || [];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let sumaCarrito = 0;

let contenedor = document.querySelector('#contenedor');

let contadorCarrito = document.querySelector('#countCarrito');

let cuerpoModal = document.querySelector('.modal-body');

let prod1 = new Producto(
  1,
  'Brownie con dulce de leche',
  70,
  'https://esruiz.com.ar/shop/wp-content/uploads/2018/07/brownie_grande_img_5490.jpg',
  10
);
let prod2 = new Producto(
  2,
  'Coco con dulce de leche',
  60,
  'https://cdn.cienradios.com/wp-content/uploads/sites/13/2015/05/barritas-de-coco-y-dulce-de-lecheWEB.jpg',
  9
);
let prod3 = new Producto(
  3,
  'Pastafrola',
  50,
  'https://recetaland.com/wp-content/uploads/2020/03/9.-pasta-frola-vegana-DF.jpg',
  9
);
let prod4 = new Producto(
  4,
  'alfajor de maicena',
  40,
  'https://scm-assets.constant.co/scm/unilever/2bb5223be0548fcc55c230aa5f951219/ce65930b-bc22-4bf3-9aa8-1e6b2708f982.png',
  10
);
let prod5 = new Producto(
  5,
  'tocinitos del cielo',
  30,
  'https://confiteriasemiliomarin.es/wp-content/uploads/2018/07/tocino-de-cielo.jpg',
  10
);
let prod6 = new Producto(
  6,
  'crumble de manzana',
  70,
  'https://cdn.cienradios.com/wp-content/uploads/sites/3/2020/03/crumble-de-manzana.jpg',
  10
);

productos.push(prod1, prod2, prod3, prod4, prod5, prod6);
console.log(productos);

// localStorage.setItem('productos', JSON.stringify(productos));

window.addEventListener('load', cargarCards);

function cargarCards() {
  for (let i = 0; i < productos.length; i++) {
    let div = document.createElement('div');
    div.classList = 'col col-md-4 mt-4';
    div.innerHTML = `
            <div class="card">
              <img src="${productos[i].imagen}" class="card-img-top imgCard" alt="${productos[i].nombre}" />
              <div class="card-body">
                <h5 class="card-title">${productos[i].nombre}</h5>
                <p class="card-text">
                  stock: ${productos[i].stock}
                </p>
              </div>
              <div class="card-footer">
                <p>$${productos[i].precio}</p>
              </div>
              <a href="#" class="btn btn-success" onclick="agregarCarrito(${productos[i].codigo})">Carrito</a>
            </div>`;
    contenedor.appendChild(div);
  }
}

function agregarCarrito(codigo) {
  contenedor.innerHTML = '<div></div>';
  let indexProd = productos.findIndex(function (prod) {
    return prod.codigo === codigo;
  });
  if (productos[indexProd].stock >= 1) {
    productos[indexProd].stock -= 1;

    //verificar si el producto existe sumarlos en carrito
    let indexCart = carrito.findIndex(function (prod) {
      return prod.id === codigo;
    });
    if (indexCart >= 0) {
      carrito[indexCart].cantidad += 1;
      carrito[indexCart].precio += carrito[indexCart].precio;
    } else {
      carrito.push({
        id: productos[indexProd].codigo,
        nombre: productos[indexProd].nombre,
        precio: productos[indexProd].precio,
        imagen: productos[indexProd].imagen,
        cantidad: 1,
      });
    }
    //si no guardo el arreglo de productos aparecera todo lo que hay en local storage al principio
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCards();
    contarCarrito();
  } else {
    alert('No hay stock disponible');
  }
}