import * as sinon from 'sinon';
import chai from 'chai';
import { Model, Query } from 'mongoose';
import VehicleModel from '../../../models/Vehicles';
// import { vehicleMock, vehicleMockWithId } from '../../mocks/vehicleMock';

import { IVehicle } from '../../../interfaces/IVehicle';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;