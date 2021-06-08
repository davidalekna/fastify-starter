import faker from 'faker';
import { getUserToken } from '../../src/utils/auth';

// passwords must have at least these kinds of characters to be valid, so we'll
// prefex all of the ones we generate with `!0_Oo` to ensure it's valid.
const getPassword = (...args) => `!0_Oo${faker.internet.password(...args)}`;
const getUsername = faker.internet.userName;
const getId = faker.random.uuid;
const getSynopsis = faker.lorem.paragraph;
const getNotes = faker.lorem.paragraph;

function buildUser({ password = getPassword(), ...overrides } = {}) {
  return {
    id: getId(),
    username: getUsername(),
    ...overrides,
  };
}

function token(user) {
  return getUserToken(buildUser(user));
}

function buildReq({ user = buildUser(), ...overrides } = {}) {
  const req = { user, body: {}, params: {}, ...overrides };
  return req;
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  };
  return res;
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next');
}

export {
  buildUser,
  token,
  buildReq,
  buildRes,
  buildNext,
  getPassword as password,
  getUsername as username,
  getId as id,
  getSynopsis as synopsis,
  getNotes as notes,
};
