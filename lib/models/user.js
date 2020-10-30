const pool = require('../utils/pool');

module.exports = class User {
  userId;
  name;
  email;
  hash;

  constructor(row) {
    this.userId = row.id;
    this.name = row.name;
    this.email = row.email;
    this.hash = row.hash;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, name, hash) VALUES ($1, $2, $3) RETURNING *',
      [user.name, user.email, user.hash]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );
    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  toJSON() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      hash: this.hash
    };
  }
};
