const pool = require('Db_connection');

const Guerries = {
  events: {
    findAll: (customerId) =>
      pool.query('SELECT * FROM events WHERE customer_id = $1 ORDER BY id DESC', [customerId])
        .then(r => r.rows),
    findById: (customerId, id) =>
      pool.query('SELECT * FROM events WHERE customer_id = $1 AND id = $2', [customerId, id])
        .then(r => r.rows[0]),
  },

  rules: {
    findAll: (customerId) =>
      pool.query('SELECT * FROM rules WHERE customer_id = $1', [customerId]).then(r => r.rows),
  },
};


module.exports =  Guerries;