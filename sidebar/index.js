const menu = document.querySelector('.menu');
menu.addEventListener('click', toggleMenu);

function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('close');
}