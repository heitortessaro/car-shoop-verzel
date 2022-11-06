import * as sinon from 'sinon';
import chai from 'chai';
import { Model, Query } from 'mongoose';
import UserModel from '../../../models/User';
import { userMock, userMockWithId } from '../../mocks/userMocks';

import { IUser } from '../../../interfaces/IUser';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('User Model', function () {
  const userModel = new UserModel();
  const userList = [userMockWithId];
  const validMongoId = userMockWithId._id;

  before(async () => {
    sinon.stub(Model, 'create').resolves(userMockWithId);
    sinon.stub(Model, 'find').resolves(userList);
    sinon.stub(Model, 'findById')
      .onCall(0).resolves(userMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate')
      .onCall(0).resolves(userMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(Model, 'findByIdAndDelete')
      .onCall(0).resolves(userMockWithId)
      .onCall(1)
      .resolves(null);
  });

  after(function () {
    sinon.restore();
  });

  describe('creating a user register', function () {
    it('sucessfully created', async function () {
      const newUser = await userModel.create(userMock);
      expect(newUser).to.be.deep.equal(userMockWithId);
    });
  });

  describe('searching user registers', function () {
    it('sucessfully found', async function () {
      const users = await userModel.read();
      expect(users).to.be.an('array');
      // o ? evita erros no caso de users seja null
      users?.forEach((user: IUser, index: number) => {
        expect(user).to.be.deep.equal(userList[index]);
      });
    });
  });

  describe('searching a user register', function () {
    it('sucessfully found', async function () {
      const user = await userModel.readOneById(validMongoId);
      expect(user).to.be.deep.equal(userMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await userModel.readOneById('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const user = await userModel.readOneById(validMongoId);
      expect(user).to.be.equal(null);
    });
  });

  describe('deleting an user register', function () {
    it('sucessfully deleted', async function () {
      const user = await userModel.delete(validMongoId);
      expect(user).to.be.deep.equal(userMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await userModel.delete('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const user = await userModel.delete(validMongoId);
      expect(user).to.be.equal(null);
    });
  });

  describe('updating an user register', function () {
    it('sucessfully updated', async function () {
      const user = await userModel.update(validMongoId, userMock);
      expect(user).to.be.deep.eq(userMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await userModel.update('WrongId', userMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const user = await userModel.update(validMongoId, userMock);
      expect(user).to.be.equal(null);
    });
  });
})