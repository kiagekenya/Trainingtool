const mongoose = require('mongoose')
const Schema = mongoose.Schema


const employeeSchema = new Schema({
    staffNumber: {type:Number},
    checkInDate: {type:Date, default:Date.now},
    staffNumberOut: { type: Number },
  checkOutDate: { type: Date },
    
})


const companyEmployeeSchema = new Schema({
  staffNumber: { type: Number },
  name: { type: String },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Employees = mongoose.model('Employees', employeeSchema, 'employees' )
const CompanyEmployees = mongoose.model('CompanyEmployees', companyEmployeeSchema, 'names');
const User = mongoose.model('User', userSchema, 'auth');

const mySchemas = {'Employees':Employees,'CompanyEmployees':CompanyEmployees, 'User':User}

module.exports = mySchemas