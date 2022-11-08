const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  model: String,
  brand: String,
  description: String,
  year: Number,
  color: String,
  buyValue: Number,
  image: String,
}, { versionKey: false });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
