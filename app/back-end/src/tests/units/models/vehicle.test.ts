import * as sinon from 'sinon';
import chai from 'chai';
import { Model, Query } from 'mongoose';
import VehicleModel from '../../../models/Vehicles';
import { vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';

import { IVehicle } from '../../../interfaces/IVehicle';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;

describe('Vehicle Model', function () {
  const vehicleModel = new VehicleModel();
  const vehicleList = [vehicleMockWithId];
  const validMongoId = vehicleMockWithId._id;

  before(async () => {
    sinon.stub(Model, 'create').resolves(vehicleMockWithId);
    sinon.stub(Model, 'find').resolves(vehicleList);
    sinon.stub(Model, 'findById')
      .onCall(0).resolves(vehicleMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(Model, 'findByIdAndUpdate')
      .onCall(0).resolves(vehicleMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(Model, 'findByIdAndDelete')
      .onCall(0).resolves(vehicleMockWithId)
      .onCall(1)
      .resolves(null);
  });

  after(function () {
    sinon.restore();
  });

  describe('creating a vehicle register', function () {
    it('sucessfully created', async function () {
      const newVehicle = await vehicleModel.create(vehicleMock);
      expect(newVehicle).to.be.deep.equal(vehicleMockWithId);
    });
  });

  describe('searching vehicle registers', function () {
    it('sucessfully found', async function () {
      const vehicles = await vehicleModel.read();
      expect(vehicles).to.be.an('array');
      // o ? evita erros no caso de vehicles seja null
      vehicles?.forEach((university: IVehicle, index: number) => {
        expect(university).to.be.deep.equal(vehicleList[index]);
      });
    });
  });

  describe('searching a vehicle register', function () {
    it('sucessfully found', async function () {
      const vehicle = await vehicleModel.readOneById(validMongoId);
      expect(vehicle).to.be.deep.equal(vehicleMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await vehicleModel.readOneById('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const vehicle = await vehicleModel.readOneById(validMongoId);
      expect(vehicle).to.be.equal(null);
    });
  });

  describe('deleting a vehicle register', function () {
    it('sucessfully deleted', async function () {
      const vehicle = await vehicleModel.delete(validMongoId);
      expect(vehicle).to.be.deep.equal(vehicleMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await vehicleModel.delete('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const vehicle = await vehicleModel.delete(validMongoId);
      expect(vehicle).to.be.equal(null);
    });
  });

  describe('updating a vehicle register', function () {
    it('sucessfully updated', async function () {
      const vehicle = await vehicleModel.update(validMongoId, vehicleMock);
      expect(vehicle).to.be.deep.eq(vehicleMockWithId);
    });
    it('error: invalid _id', async function () {
      try {
        await vehicleModel.update('WrongId', vehicleMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
    it('error: _id not found', async function () {
      const vehicle = await vehicleModel.update(validMongoId, vehicleMock);
      expect(vehicle).to.be.equal(null);
    });
  });
})