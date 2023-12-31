import Role from '../Model/roleModel.js';
import Employee from '../Model/employeeModel.js';
import mongoose from 'mongoose';
import Department from '../Model/departmentModel.js';
import { handleRoleUpdateResponse, handleRoleUpdateError } from '../Response/RoleResponse.js';
import { prepareRoleData } from '../Request/RoleRequest.js';

// Myself (Gabriel Worked API Function)
// Function to mark role as inactive by role_id
const makeRoleInactive = async (req, res) => {
  try {
    const { role_id, is_active_flag } = await prepareRoleData(req);

    const updatedRole = await Role.findOneAndUpdate(
      { role_id },
      { is_active_flag },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    handleRoleUpdateResponse(res, is_active_flag, updatedRole);
  } catch (error) {
    handleRoleUpdateError(res, error.message); // Send the validation error message in the response
  }
};

// Function to list roles with filters for active and inactive roles
const listRoles = async (req, res) => {
  try {
    const { is_active_flag } = req.body;

    const filter = {};
    if (typeof is_active_flag === 'boolean') {
      filter.is_active_flag = is_active_flag;
    }

    const roles = await Role.find(filter);

    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: 'No roles found' });
    }

    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};


// API to create a new role
const createRole = async (req, res) => {
  try {
    const { role_name, dept_name, inserted_by_name } = req.body;

    // Find the corresponding Employee details by name
    const insertedByEmployee = await Employee.findOne({ firstname: inserted_by_name });

    if (!insertedByEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Find the corresponding Department details by name
    const department = await Department.findOne({ dept_name });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Use the dept_id from the Department collection
    const newRole = new Role({
      role_name,
      dept_id: department.dept_id,
      dept_name,
      inserted_by: insertedByEmployee._id,
      inserted_by_name,
    });

    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    console.error('Error creating role:', err);
    res.status(500).json({ error: 'Failed to create role' });
  }
};
  
  // Get all roles
  const getAllRoles = async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json(roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  };
  
// Function to get a role by role ID

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.role_id;
    const role = await Role.findOne({ role_id: roleId });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};
  
// Function to get a Update by role ID
  const updateRoleById = async (req, res) => {
    try {
      const { role_name, dept_id, dept_name, updated_by } = req.body;
      const roleIdToUpdate = req.params.role_id;
  
      const filter = { role_id: roleIdToUpdate }; 
      const update = {
        role_name,
        dept_id,
        dept_name,
        updated_by,
        updated_date: new Date(),
      };
  
      const updatedRole = await Role.updateOne(filter, update);
  
      if (updatedRole.nModified === 0) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
      console.error('Error updating role:', error);
      res.status(500).json({ error: 'Failed to update role' });
    }
  };
  
  
  
  // Delete a role by role ID
  const deleteRoleById = async (req, res) => {
    try {
      const roleId = mongoose.Types.ObjectId(req.params.role_id);
      const deletedRole = await Role.findByIdAndDelete(roleId);
      if (!deletedRole) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json(deletedRole);
    } catch (error) {
      console.error('Error deleting role:', error);
      res.status(500).json({ error: 'Failed to delete role' });
    }
  };

export { 
  makeRoleInactive, 
  listRoles, 
  createRole,  
  getAllRoles,  
  getRoleById,  
  updateRoleById,  
  deleteRoleById, 
};
