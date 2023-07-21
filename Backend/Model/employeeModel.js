import { Schema, model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import mongoose from 'mongoose';

// Assuming you have already created a mongoose connection
autoIncrement.initialize(mongoose.connection);

const employeeSchema = new Schema({
  emp_id: {
    type: Number,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  date_of_join: {
    type: Date,
    required: true,
  },
  dept_id: {
    type: Number,
    required: true,
  },
  dept_name: {
    type: String,
    required: true,
  },
  role_id: {
    type: Number,
    required: true,
  },
  role_name: {
    type: String,
    required: true,
  },
  reporting_to_id: {
    type: Number,
  },
  inserted_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  is_active_flag: {
    type: Boolean,
    default: true,
  },
  inserted_by: {
    type: String,
  },
  updated_by: {
    type: String,
  },
});

// Initialize auto-increment for the role_id field
employeeSchema.plugin(autoIncrement.plugin, {
  model: 'Employee',
  field: 'emp_id',
  startAt: 1001,
  incrementBy: 1,
});

const Employee = model('Employee', employeeSchema);

export default Employee;
