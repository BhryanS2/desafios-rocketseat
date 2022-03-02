import assert from 'assert';
import { handleEmail } from './email.js';
import { findEmail } from './email/find.js';
import { validadeEmail } from './email/validate.js';


const currentEmailTest = "test@gmail.com"
{
  const isValid = validadeEmail(currentEmailTest);
  const expected = true
  assert.strictEqual(isValid, expected)
}

{
  const currentExists = await findEmail(currentEmailTest)
  const expected = false
  assert.strictEqual(currentExists, expected)
}

{
  const emailForCreate = "teste@rocketseat.com";
  const res = await handleEmail(JSON.stringify({ email: emailForCreate }))
  console.log(res)
}