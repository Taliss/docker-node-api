import UserService from '../server/api/services/user.service';

export const seedDB = (fakeUsers) => {
  return Promise.all(fakeUsers.map(UserService.create));
};

export const cleanDB = (fakeUsers) => {
  return Promise.all(fakeUsers.map((user) => UserService.delete(user.email)));
};
