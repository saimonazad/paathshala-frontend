import mock from '../mockConfig';

mock.onGet('/users').reply(200, {
  users: [{ id: 1, name: 'John Smith' }],
});
