const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crystaline',
    charset: 'utf8',
  },
});

const bookshelf = require('bookshelf')(knex);

export default bookshelf;
