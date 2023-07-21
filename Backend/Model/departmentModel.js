import { Schema, model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import mongoose from 'mongoose';

// already created a mongoose connection
autoIncrement.initialize(mongoose.connection);

// Define the department schema
const departmentSchema = new Schema({
  dept_id: {
    type: Number,
    unique: true,
  },
  dept_name: {
    type: String,
    required: true,
  },
  inserted_by: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
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
});

// Initialize auto-increment for the dept_id field
departmentSchema.plugin(autoIncrement.plugin, {
  model: 'Department',
  field: 'dept_id',
  startAt: 2010,
  incrementBy: 1,
});

const Department = model('Department', departmentSchema);

// Export the Department model
export default Department;
