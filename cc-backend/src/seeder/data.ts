import { hashPassword } from 'src/util/hashPassword';
import { v4 as uuid } from 'uuid';

export const dailyCalorieLimit = 2100;

export const testUsers = [
  {
    firstName: 'Daniel',
    lastName: 'Velazquez',
    email: 'danvel@gmail.com',
    dailyCalorieLimit,
    password: hashPassword('1234'),
    accessToken: uuid(),
    roles: [],
  },
  {
    firstName: 'Emanuel',
    lastName: 'Krinsky',
    email: 'emkring@gmail.com',
    dailyCalorieLimit,
    password: hashPassword('1234'),
    accessToken: uuid(),
    roles: [],
  },
  {
    firstName: 'Natalie',
    lastName: 'Gruenwalder',
    email: 'natalie@gmail.com',
    dailyCalorieLimit,
    password: hashPassword('1234'),
    accessToken: uuid(),
    roles: [],
  },
  {
    firstName: 'Thomas',
    lastName: 'Scottford',
    email: 'thom.scott@gmail.com',
    dailyCalorieLimit,
    password: hashPassword('1234'),
    accessToken: uuid(),
    roles: [],
  },
  {
    firstName: 'Abigel',
    lastName: 'Mignon',
    email: 'abygirl@gmail.com',
    dailyCalorieLimit,
    password: hashPassword('1234'),
    accessToken: uuid(),
    roles: ['ADMIN'],
  },
  {
    firstName: 'Michael',
    lastName: 'Strodowski',
    email: 'strodo.mike@gmail.com',
    dailyCalorieLimit,
    password: hashPassword('1234'),
    accessToken: uuid(),
    roles: [],
  },
  {
    firstName: 'Brandon',
    lastName: 'Hessberg',
    email: 'brandon.hess@gmail.com',
    dailyCalorieLimit,
    password: hashPassword('1234'),
    accessToken: uuid(),
    roles: ['ADMIN'],
  },
];
