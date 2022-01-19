const { query, end } = require('../database');

const sql = `
  DROP TABLE IF EXISTS credit_cards_tab;
  CREATE TABLE credit_cards_tab (
    id SERIAL primary key,
    email VARCHAR not null,
    number VARCHAR unique not null,
    cvv INT unique not null,
    expiry INT not null,
  )
`(async () => {
  console.log('Creating table');
  try {
    await query(sql, [], true);
    console.log('Successfully created table');
  } catch (error) {
    console.log('Error creating table');
    console.error(error);
  }
  await end();
})();
