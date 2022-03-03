const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const load = document.querySelector('.loadContainer');

const toggleLoad = () => {
  load.classList.toggle('disable');
};

function clearFields() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
}

const getEmail = (submitEvent) => {
  return submitEvent.target.email.value;
}

async function handleSubmit(event) {
  event.preventDefault();
  toggleLoad()
  const email = getEmail(event);
  const [error, result] = await submitToServer(email);
  if (error) {
    console.log(error.error);
    toggleLoad()
    return;
  }
  console.log(result);
  clearFields();
  toggleLoad()
}

function validadeEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

async function submitToServer(email) {
  const isValid = validadeEmail(email);
  if (!isValid) return ['invalid email', null];
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }
  const url = 'http://localhost:3000/'
  const reponse = await fetch(url, options);
  const result = await reponse.json();
  if (!result.success) return [result.error, null];
  return [null, result.email];
}