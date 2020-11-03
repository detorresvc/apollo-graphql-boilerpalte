import bookshelf from '../config';

const Customer = bookshelf.model('Customer', {
  tableName: 'customers',
  hasTimestamps: true
});

export default Customer;
