import { Schema, model, mongoose } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// Assuming you have already created a mongoose connection
autoIncrement.initialize(mongoose.connection);

const roleSchema = new Schema({
  role_id: { type: Number, unique: true },
  role_name: { type: String },
  dept_id: { type: Number, ref: 'Department', unique: true }, // Reference to the Department collection
  dept_name: { type: String, ref: 'Department' }, // Reference to the Department collection
  inserted_date: { type: Date },
  updated_date: { type: Date },
  inserted_by: { type: String, ref: 'Employee' }, // Reference to the Employee collection
  updated_by: { type: String, ref: 'Employee' }, // Reference to the Employee collection
  is_active_flag: { type: Boolean, default: true }, // Added the is_active_flag field
});

// Initialize auto-increment for the role_id field
roleSchema.plugin(autoIncrement.plugin, {
  model: 'Role',
  field: 'role_id',
  startAt: 1001,
  incrementBy: 1,
});

const Role = model('Role', roleSchema);

export default Role;
