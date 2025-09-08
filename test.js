const fetch = require('node-fetch');

fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'hello' })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
