import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import UserModel from '../../../models/User';
import UserService from '../../../services/User';
import { userMock, userMockWithId } from '../../mocks/userMocks';

describe('User Service', function () {
  const userModel = new UserModel();
  const userService = new UserService(userModel);

  before(() => {
    sinon.stub(userModel, 'create').resolves(userMockWithId);
    sinon.stub(userModel, 'readOneByEmail')
      .onCall(0).resolves(userMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore()
  });

  describe('creating a user register', () => {
    it('sucessfully created', async () => {
      const newUser = await userService.create(userMock);
      expect(newUser).to.be.deep.equal(userMockWithId);
    });
    it('error: invalid body data', async () => {
      let err
      try {
        await userService.create({});
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    });
  });

  describe('reading an user with email', () => {
    it('sucessfully read user registers', async () => {
      const user = await userService.readOneByEmail('test@test.com');
      expect(user).to.be.deep.equal(userMockWithId);
    });
    it('error: results not found', async () => {
      try {
        await userService.readOneByEmail('wrongemail@test.com');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });

});