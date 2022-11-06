import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import VehicleModel from '../../../models/Vehicles';
import VehicleService from '../../../services/Vehicle';
import { vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';

describe('Vehicle Service', function () {
  const vehicleModel = new VehicleModel();
  const vehicleService = new VehicleService(vehicleModel);
  const vehicleList = [vehicleMockWithId];
  const validMongoId = vehicleMockWithId._id;

  before(() => {
    sinon.stub(vehicleModel, 'create').resolves(vehicleMockWithId);
    sinon.stub(vehicleModel, 'read')
      .onCall(0).resolves(vehicleList)
      .onCall(1).resolves(null);
    sinon.stub(vehicleModel, 'readOneById')
      .onCall(0).resolves(vehicleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(vehicleModel, 'update')
      .onCall(0).resolves(vehicleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(vehicleModel, 'delete')
      .onCall(0).resolves(vehicleMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore()
  });

  describe('creating a vehicle register', () => {
    it('sucessfully created', async () => {
      const newVehicle = await vehicleService.create(vehicleMock);
      expect(newVehicle).to.be.deep.equal(vehicleMockWithId);
    });
    it('error: invalid body data', async () => {
      let err
      try {
        await vehicleService.create({});
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    });
  });

  describe('reading vehicles registers', () => {
    it('sucessfully read vehicle registers', async () => {
      const vehicles = await vehicleService.read();
      expect(vehicles).to.be.deep.equal(vehicleList);
    });
    it('error: results not found', async () => {
      try {
        await vehicleService.read();
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
      }
    });
  });

  describe('reading vehicles registers by id', () => {
    it('sucessfully read vehicle register', async () => {
      const vehicle = await vehicleService.readOneById(validMongoId);
      expect(vehicle).to.be.deep.equal(vehicleMockWithId);
    });
    it('error: id not found', async () => {
      try {
        await vehicleService.readOneById('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);;
      }
    });
  });

  describe('deleting a vehicle register', () => {
    it('sucessfully delete a register', async () => {
      const vehicle = await vehicleService.delete(validMongoId);
      expect(vehicle).to.be.deep.equal(vehicleMockWithId);
    });
    it('error: id not found', async () => {
      try {
        await vehicleService.delete('WrongId');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);;
      }
    });
  });

  describe('updating a vehicle register', () => {
    it('sucessfully update a register', async () => {
      const vehicle = await vehicleService.update(validMongoId, vehicleMock);
      expect(vehicle).to.be.deep.equal(vehicleMockWithId);
    });
    it('error: id not found', async () => {
      try {
        await vehicleService.update('WrongId', vehicleMock);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);;
      }
    });
    it('error: invalid body data', async () => {
      let err
      try {
        await vehicleService.update(validMongoId, {} as any);
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    });
  });

});