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

function validarRegistro(e) {
  e.preventDefault();

  let idReg = idRandom();
  let usuarioReg = document.querySelector('#user_r').value;
  let passwordReg = document.querySelector('#pass_r').value;
  let passRep = document.querySelector('#pass_rep').value;
  let emailReg = document.querySelector('#email_r').value;

  let validar = usuarios.find(function (user) {
    return user.email === email;
  });

  if (validar !== undefined) {
    alert('Usuario existente. Intenta con otro email');

    formularioReg.reset();

    return;
  }
  if (passwordReg !== passRep) {
    let divError = document.querySelector('.error');
    divError.textContent = 'Las contraseñas no coinciden';
    setTimeout(() => {
      divError.remove();
    }, 1500);
    formularioReg.reset();
  }

  let newUser = new Usuario(idReg, usuarioReg, passwordReg, passRep, emailReg);

  usuarios.push(newUser);

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  formularioReg.reset();
  alert('Registro exitoso');
}
