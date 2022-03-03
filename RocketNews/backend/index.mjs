import assert from 'assert';
import debug from 'debug'
import { createServer } from 'http';
import { setDbModel } from './src/db.mjs'
import { handleEmail } from './src/email/index.js';

const rocketNews = await setDbModel()
const logger = debug('api:index')

function handleRequest(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (request.method !== 'POST') {
    response.statusCode = 400;
    response.end('Bad Request');
    return;
  }

  if (request.url !== '/') {
    response.statusCode = 404;
    response.end('Not Found');
  }

  request.on('data', async (buffer) => {
    const data = buffer.toString();
    const [error, result] = await handleEmail(rocketNews, data);
    if (error) {
      logger(error);
      response.statusCode = 400;
      response.end(JSON.stringify({ error, success: false }));
      return;
    }

    response.statusCode = 201;
    response.end(JSON.stringify({ result, success: true }));
  });

  request.setTimeout(500, () => {
    response.statusCode = 408;
    response.end(JSON.stringify({ error: 'timeout', success: false }));
  });
}

createServer(handleRequest)
  .listen(3000, () => {
    console.clear();
    logger('Server running at http://localhost:3000/');
  });

{
  const currentEmailTest = "test@gmail.com"
  const res = await handleEmail(rocketNews, JSON.stringify({ email: currentEmailTest }))
  const expectedError = 'email already exists'
  const expectedResult = null
  const [{ error }, result] = res
  assert.equal(error, expectedError)
  assert.equal(result, expectedResult)
}

{
  const currentEmailTest = "test@hotmail.com"
  const response = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: currentEmailTest }),
  })
  const { error, success } = await response.json()
  const expectedError = 'email already exists'
  const expectedSuccess = false
  const currentMessage = error.error
  assert.equal(currentMessage, expectedError)
  assert.equal(success, expectedSuccess)
  logger(`${currentMessage} - ${success}`)
}
// curl -X POST -H "Content-Type: application/json" -d '{"email": "adwadawd@adwadawd.com"}' http://localhost:3000h