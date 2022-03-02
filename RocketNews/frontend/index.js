const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const load = document.querySelector('.loadContainer');
const toggle = () => {
  load.classList.toggle('disable');
};

function clearFields() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
}

async function handleSubmit(event) {
  event.preventDefault();
  toggle()
  const email = event.target.email.value;
  const [error, result] = await submitToServer(email);
  if (error) {
    alert(error.error);
    toggle()
    return;
  }
  clearFields();
  toggle()
}

function validadeEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

async function submitToServer(email) {
  const isValid = validadeEmail(email);
  if (!isValid) return ['invalid email', null];
  const reponse = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const result = await reponse.json();
  if (!result.success) return [result.error, null];
  return [null, result.email];
}