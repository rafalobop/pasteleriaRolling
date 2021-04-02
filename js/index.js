let form = document.querySelector('.form');
let user = document.querySelector('#user');
let pass = document.querySelector('#pass');

form.addEventListener('submit', enviarForm);

function enviarForm(e) {
  e.preventDefault();
  let users = Array({
    usuario: user.value,
    contraseña: pass.value,
  });
  localStorage.setItem('users', JSON.stringify(users));
  location.href = 'home.html';
}
