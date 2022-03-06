const keyTheme = "@rocketseat/challenge:theme"
const main = document.querySelector('main');
const chekbox = document.querySelector('.themeSwitch input');

function getTheme() {
  const theme = localStorage.getItem(keyTheme);
  return theme;
}

function setLocalThemeValue(theme) {
  localStorage.setItem(keyTheme, theme);
}

function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === 'dark' ? '' : 'dark';
  setLocalThemeValue(newTheme);
  setTheme(newTheme);
  setCheckbox(newTheme);
}

function setTheme(theme) {
  main.classList.toggle('dark', theme === '');
}

function setCheckbox(theme) {
  const boolean = theme === 'dark'
  chekbox.checked = !boolean;
}

function setLocalTheme() {
  const theme = getTheme();
  setCheckbox(theme);
  setTheme(theme);
}

addEventListener('DOMContentLoaded', setLocalTheme);

const btn = document.querySelector('.themeSwitch');
btn.addEventListener('click', toggleTheme);