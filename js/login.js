//animacion de aparecer y desaparecer formulario
let btnReg = document.querySelector('#btn_reg');
let btnLogin = document.querySelector('#btn_login');
let formLog = document.querySelector('#form_log');
let formReg = document.querySelector('#form_reg');

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    formLog.classList.contains(
      'hide',
      'animate__animated',
      'animate__fadeOutDown'
    ) &&
    formReg.classList.contains('show', 'animate__animated', 'animate__fadeInUp')
  ) {
    formLog.classList.remove(
      'hide',
      'animate__animated',
      'animate__fadeOutDown'
    );
    formLog.classList.add('show', 'animate__animated', 'animate__fadeInUp');
    formReg.classList.remove('show', 'animate__animated', 'animate__fadeInUp');
    formReg.classList.add('hide', 'animate__animated', 'animate__fadeOutDown');
  }
});
btnReg.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    formLog.classList.contains(
      'show',
      'animate__animated',
      'animate__fadeInUp'
    ) &&
    formReg.classList.contains(
      'hide',
      'animate__animated',
      'animate__fadeOutDown'
    )
  ) {
    formLog.classList.remove('show', 'animate__animated', 'animate__fadeInUp');
    formLog.classList.add('hide', 'animate__animated', 'animate__fadeOutDown');
    formReg.classList.remove(
      'hide',
      'animate__animated',
      'animate__fadeOutDown'
    );
    formReg.classList.add('show', 'animate__animated', 'animate__fadeInUp');
  }
});

//validacion de registro
//creamos el usuario

class Usuario {
  constructor(idReg, usuario, password, passRep, email, activo = true) {
    this.idReg = idReg;
    this.usuario = usuario;
    this.password = password;
    this.passRep = passRep;
    this.email = email;
    this.activo = activo;
  }
}

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// creamos una funcion para generar un id automatico
function idRandom() {
  if (usuarios.length > 0) {
    return (
      usuarios[usuarios.length - 1].idReg + Math.round(Math.random() * 100)
    );
  } else {
    return Math.round(Math.random() * 100);
  }
}

let formularioReg = document.querySelector('#form_r');
formularioReg.addEventListener('submit', validarRegistro);

function validarRegistro() {
  // e.preventDefault();

  let idReg = idRandom();
  let usuarioReg = document.querySelector('#user_r').value;
  let passwordReg = document.querySelector('#pass_r').value;
  let passRep = document.querySelector('#pass_rep').value;
  let emailReg = document.querySelector('#email_r').value;

  let validar = usuarios.find(function (user) {
    return user.emailReg === emailReg;
  });

  if (validar !== undefined) {
    Swal.fire({
      icon: 'error',
      title: 'Ups!',
      text: 'Este usuario ya existe. Intenta con otro',
    });

    formularioReg.reset();

    return;
  }
  if (passwordReg !== passRep) {
    let divError = document.createElement('div');
    let formularioReg = document.querySelector('#form_r');
    divError.classList.add('error');
    divError.textContent = 'Las contraseñas no coinciden';
    setTimeout(() => {
      divError.remove();
    }, 1500);
    formularioReg.reset();

    formularioReg.appendChild(divError);
    return;
  }

  let newUser = new Usuario(idReg, usuarioReg, passwordReg, passRep, emailReg);

  usuarios.push(newUser);

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  formularioReg.reset();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Registro exitoso',
    showConfirmButton: false,
    timer: 1500,
  });
}

//formulario login

let admin = new Usuario(9999, 'admin', 'admin', 'admin', 'admin@tucucake.com');
// let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
// llamamos a los usuarios de localstorage
//creamos un objeto vacio
let usuario = {};
let btn_log = document.querySelector('#btn_log');
usuarios.push(admin);
//logica del login
localStorage.setItem('usuarios', JSON.stringify(usuarios));
function validar() {
  let inputUser = document.querySelector('#user');
  let inputPassword = document.querySelector('#pass');

  //identificar el usuario
  let user = usuarios.find(function (user) {
    return user.usuario === inputUser.value;
  });
  //si se ingresa el usuario verifica la contraseña
  if (user !== undefined) {
    let pass = usuarios.find(function (user) {
      return user.password === inputPassword.value;
    });
    if (pass !== undefined) {
      if (pass.activo) {
        usuario = {
          idReg: pass.idReg,
          user: pass.usuario,
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 3000,
        });

        if (pass.idReg === 9999) {
          setTimeout(() => {
            location.href = 'admin.html';
          }, 3000);
        } else {
          setTimeout(() => {
            location.href = 'cart.html';
          }, 3000);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: 'Usted está suspendido. Contáctese con el administrador',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ups!',
        text: 'usuario o contraseña incorrectos',
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Ups!',
      text: 'usuario o contraseña incorrectos',
    });
    document.querySelector('#form_login').reset();
  }
}

let ingresar = document
  .querySelector('#form_login')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    validar();
  });
