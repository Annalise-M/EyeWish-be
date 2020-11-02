const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const create = async({ email, password }) => {
  const passwordHash = await bcrypt.hash(password, 4);
  return User.insert({ email, passwordHash });
};

const authorize = async({ email, password }) => {
  const user = await User.findByEmail(email);
  if(!user) throw new Error('Invalid email');

  const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
  if(!passwordsMatch) throw new Error('Invalid email');

  return user;
};

const makeToken = user => {
  const token = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
    expiresIn: '1d'
  });
  return token;
};

const verifyToken = token => {
  const user = jwt.verify(token, process.env.APP_SECRET);
  return user;
};

module.exports = {
  create,
  authorize,
  makeToken,
  verifyToken
};

// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('../auth/jwt');
// const User = require('../models/user');
// const ensureAuth = require('../middleware/ensure-auth');

// function getProfileWithToken(User) {
//   const { hash, ...rest } = User;
//   return {
//     ...rest,
//     token: jwt.sign({ id: User.id })
//   };
// }

// const defaultQueries = {
//   select(email) {
//     return User.query(`
//       SELECT id, name, email, hash
//       FROM users
//       WHERE email = $1;
//     `,
//     [email]
//     ).then(result => result.rows[0]);
//   },
//   insert(User, hash) {
//     return User.query(`
//      INSERT INTO Users (name, email, hash)
//      VALUES ($1, $2, $3)
//      RETURNING id, name, email;
//     `,
//     [User.name, User.email, hash]
//     ).then(result => result.rows[0]);
//   }
// };

// module.exports = function createAuthRoutes(queries = defaultQueries) {
//   const router = express.Router();

//   router.get('/verify', ensureAuth, (req, res) => { 
//     res.json({ verified: true });
//   });

//   router.post('/signup'), (req, res) => {
//     const { password, ...User } = req.body;
//     const email = User.email;

//     // email needs to exist
//     if(!email || !password) {
//       res.status(400).json({ error: 'email required' });
//       return;
//     }

//     // email needs to not exist already
//     queries.selectUser(email)
//       .then(foundUser => {
//         if(foundUser) {
//           res.status(400).json({ error: 'email already exists' });
//           return;
//         }
        
//         // insert into profile the new user
//         queries.insertUser(User, bcrypt.hashSync(password, 8))
//           .then(user => {
//             res.json(getProfileWithToken(user));
//           });
//       });
    

//     router.post('/signin', (req, res) => {
//       const body = req.body;
//       const email = body.email;
    
//       if(!email) {
//         res.status(400).json({ error: 'email required' });
//         return;
//       }

//       queries.selectUser(email)
//         .then(User => {
//           if(!User || !bcrypt.compareSync(email, User.hash)) {
//             res.status(400).json({ error: 'email is incorrect' });
//             return;
//           }

//           res.json(getProfileWithToken(User));
//         });
//     });

//     return router;
//   };
// };
