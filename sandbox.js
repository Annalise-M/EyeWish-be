const jwt = require('jsonwebtoken');

const token = '$2y$12$kML3rqSwoxS4YElV6aKpK.N6qdm79o3pKO6rvNF9octheRhvCPkza ';
//const expiredToken = '';

// sign
// const token = jwt.sign({
//   name: 'spot',
//   age: 5,
//   weight: '20 lbs'
// }, 'supersecret', {
//   expiresIn: '2h'
// });
// header + payload + supersecret
// console.log(token);

// verify
const result = jwt.verify(token, 'supersecret');
console.log(result);
