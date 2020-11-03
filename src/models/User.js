import bookshelf from '../config';

const User = bookshelf.model('User', {
  tableName: 'users',
});

export default User;
