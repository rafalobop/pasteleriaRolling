// let form = document.querySelector('.form');
// let user = document.querySelector('#user');
// let pass = document.querySelector('#pass');

// form.addEventListener('submit', enviarForm);

// class Usuario {
//   constructor(id, usuario, password, activo = true) {
//     this.id = id;
//     this.usuario = usuario;
//     this.password = password;
//     this.activo = activo;
//   }
// }

// let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// // creamos una funcion para generar un id automatico
// function idRandom() {
//   if (usuarios.length > 0) {
//     return usuarios[usuarios.length - 1].id + Math.round(Math.random() * 100);
//   } else {
//     return Math.round(Math.random() * 100);
//   }
// }

// function enviarForm(e) {
//   e.preventDefault();

//   let id = idRandom();
//   let usuario = document.querySelector('#user').value;
//   let password = document.querySelector('#pass').value;

//   let validar = usuarios.find(function (user) {
//     return user.usuario === usuario;
//   });

//   if (validar !== undefined) {
//     alert('Usuario existente. Intenta con otro email');

//     form.reset();
//     // usuario.focus();

//     return;
//   }

//   let newUser = new Usuario(id, usuario, password);

//   usuarios.push(newUser);

//   localStorage.setItem('usuarios', JSON.stringify(usuarios));

//   form.reset();
//   alert('Registro exitoso');
// }

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
