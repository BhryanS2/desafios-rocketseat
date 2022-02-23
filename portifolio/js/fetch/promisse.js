export const toRespose = async (promise) => promise
  .then(result => [null, result])
  .catch(error => [error, null]);