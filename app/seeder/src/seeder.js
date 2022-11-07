const User = require('./models/User');
const userData = require('./data/user');
const Vehicle = require('./models/Vehicle');
const vehiclesData = require('./data/vehicles');

const seeder = async () => {
  await User.deleteMany({});
  await Vehicle.deleteMany({});
  await User.insertMany(userData);
  await Vehicle.insertMany(vehiclesData);
  console.log('seeder finished');
  process.exit(0);
};

module.exports = seeder;
