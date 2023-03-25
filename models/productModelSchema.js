const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: [String],
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  BatterySize: {
    type: Number,
    required: true,
  },
  BatteryVolt: {
    type: Number,
    required: true,
  },
  BatteryAmpere: {
    type: Number,
    required: true,
  },
  ChargerIncluded: {
    type: Boolean,
    required: true,
  },
  ChargerRating: {
    type: Number,
    required: true,
  },
  PAYLOAD: {
    type: String,
    required: true,
  },
  DrivingRange: {
    type: Number,
    required: true,
  },
  ChargingTime: {
    type: Number,
    required: true,
  },
  TopSpeed: {
    type: Number,
    required: true,
  },
  SeatingCapacity: {
    type: Number,
    required: true,
  },
  FrontBrakeType: {
    type: String,
    required: true,
  },
  RearBrakeType: {
    type: String,
    required: true,
  },
  FrontSuspension: {
    type: String,
    required: true,
  },
  RearSuspension: {
    type: String,
    required: true,
  },
  TyreType: {
    type: String,
    required: true,
  },
  AirbagsNum: {
    type: Number,
    required: true,
  },
  BrakeTypeABS: {
    type: String,
    required: true,
  },
  AutomaticEmergencyBraking: {
    type: String,
     required: true,
  },
  Ac: {
    type: String,
    required: true,
  },
  ParkingAssist: {
    type: String,
    required: true,
  },
  Sunroof_Moonroof: {
    type: String,
    required: true,
  },
  Headlights: {
    type: String,
    required: true,
  },
  TailLights: {
    type: String,
    required: true,

  },
  DistancetoEmpty: {
    type: String,
    required: true,
  },
  LowFuelLevelWarning: {
    type: String,
    required: true,
  },
  Display: {
    type: String,
    required: true,
  },
  TouchScreenSize: {
    type: Number,
    required: true,
  },
  Speakers: {
    type: Number,
    required: true,
  },
  productSteeringMountedControls: {
    type: String,
    required: true,
  },
  VoiceCommand: {
    type: String,
    required: true,
  },
  GPSsystem: {
    type: String,
    required: true,
  },
  BluetoothCompatibility: {
    type: String,
    required: true,
  },
  BatteryWarranty: {
    type: Number,
    required: true,
  },
  BatteryWarrantyKM: {
    type: Number,
    required: true,
  },
  // productBrochure : {
  //     type : String,
  // },
  SelectColour: {
    type: String,
    required: true,
  },
  Interiors: {
    type: String,
    required: true,
  },

  OverallRating: {
    type: Number,
    required: true,
  },
  FuelFreeRating: {
    type: Number,
    required: true,
  },
  VehicleType: {
    type: String,
    required: true,
  },
  Brand: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  vendorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "vendor",
  },
  isActive: {
    type: Boolean,
  },
});

productSchema.set("timestamps", true);

module.exports = mongoose.model("product", productSchema);
