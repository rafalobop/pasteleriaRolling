//boton desplazar suave hacia arriba
window.onscroll = function () {
  let boton = document.querySelector('.btn_goup');
  if (document.documentElement.scrollTop < 200) {
    boton.classList.add('hide');
  } else {
    boton.classList.remove('hide');
    boton.classList.add('show');
  }
  document.querySelector('.btn_goup').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};
