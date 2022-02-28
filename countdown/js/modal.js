const modal = {
  toggle(element) {
    const modal = element
    modal.classList.toggle('active');
  },

  open(element) {
    const modal = element
    if (modal.classList.contains('active')) return;
    modal.classList.add('active');
  },
  close(element) {
    const modal = element
    if (!modal.classList.contains('active')) return;
    modal.classList.remove('active');
  },
};

const modalElement = document.querySelector('.modal');
const buttonSignup = document.querySelector('.signup');
const buttonClose = document.querySelector('.modal .close');
const buttonSubmit = document.querySelector('.submit');



const signup = () => {
  modal.toggle(modalElement);
};

const close = () => {
  modal.toggle(modalElement);
}

const submit = e => {
  e.preventDefault();
  modal.close(modalElement);
}


buttonSignup.addEventListener('click', signup);
buttonClose.addEventListener('click', close);
buttonSubmit.addEventListener('submit', submit);