'use strict';
const request = require('superagent');
const Base = require('./Base.js');
const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
  zone: String,
  school: String,
  passport: String,
  surname: String,
  firstname: String,
  middlename: String,
  gender: String,
  email: String,
  phone: String,
  address: String,
  address2: String,
  state: String,
  lga: String,
  faculty: String,
  dept: String,
  schoolreg: String,
  jambreg: String,
  degree: String,
  level: String,
  completion: Date,
  nok_fullname: String,
  nok_lga: String,
  nok_email: String,
  nok_phone: String,
  sports: String
});

registerSchema.methods.get = (parameter) => {
  console.log(this[parameter]);
  return this[parameter];
};
const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
