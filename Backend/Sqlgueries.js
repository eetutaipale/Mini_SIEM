const pool = require('Db_connection');

const Guerries = {
  async All(customerId) {
    const result = await pool.query(
      'SELECT * FROM events WHERE customer_id = $1 ORDER BY id DESC',
      [customerId]
    );
    return result.rows;
  },

  async Id(customerId, id) {
    const result = await pool.query(
      'SELECT * FROM events WHERE customer_id = $1 AND id = $2',
      [customerId, id]
    );
    return result.rows[0];
  },
};
module.exports =  Guerries;