import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';
import VehicleController from '../../../controllers/Vehicle';
import VehicleServise from '../../../services/Vehicle';
import VehicleModel from '../../../models/Vehicles';

describe('Vehicle Controller', () => {
  const vehicleModel = new VehicleModel();
  const vehicleService = new VehicleServise(vehicleModel);
  const vehicleController = new VehicleController(vehicleService);
  const vehicleList = [vehicleMockWithId];
  const validMongoId = vehicleMockWithId._id;

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(vehicleService, 'create').resolves(vehicleMockWithId);
    sinon.stub(vehicleService, 'read').resolves(vehicleList);
    sinon.stub(vehicleService, 'readOneById').resolves(vehicleMockWithId);
    sinon.stub(vehicleService, 'delete').resolves(vehicleMockWithId);
    sinon.stub(vehicleService, 'update').resolves(vehicleMockWithId);


    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  });

  describe('creating a vehicle register', () => {
    it('sucessufully create', async () => {
      req.body = vehicleMock;
      await vehicleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(vehicleMockWithId)).to.be.true;
    });
  });

  describe('reading vehicles registers', () => {
    it('sucessufully read registers', async () => {
      await vehicleController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(vehicleList)).to.be.true;
    });
  });

  describe('reading a vehicle register', () => {
    it('sucessufully read register', async () => {
      req.params = { id: validMongoId };
      await vehicleController.readOneById(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(vehicleMockWithId)).to.be.true;
    })
  });

  describe('deleting a vehicle registers', () => {
    it('sucessufully deletes a register', async () => {
      req.params = { id: validMongoId };
      await vehicleController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(vehicleMockWithId)).to.be.true;
    });
  });

  describe('updating a vehicle register', () => {
    it('sucessufully updates a register', async () => {
      req.body = vehicleMock;
      req.params = { id: validMongoId };
      await vehicleController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(vehicleMockWithId)).to.be.true;
    });
  });
})