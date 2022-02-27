const sidebar = document.querySelector('.content-left');
const bars = document.querySelector('.bars');

bars.addEventListener('click', toggleSidebar);

const width = window.innerWidth;

if (width < 1200) {
  sidebar.classList.add('active');
}

function toggleSidebar() {
  sidebar.classList.toggle('active');
}