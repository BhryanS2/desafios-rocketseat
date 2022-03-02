import { validadeEmail } from "./validate.js"
import { findEmail } from "./find.js"
import { registerEmail } from "./register.js"

export async function handleEmail(rockeNewsDb, data) {
  const { email } = JSON.parse(data);

  const isValid = validadeEmail(email);
  if (!isValid) return [{
    error: 'invalid email',
  }, null];

  const isExists = await findEmail(rockeNewsDb, email);
  if (isExists) return [{
    error: 'email already exists',
  }, null];

  const isSuccess = await registerEmail(rockeNewsDb, email);
  if (!isSuccess) return [{ error: 'error on create email' }, null];

  return [null, { email: email }];
}
