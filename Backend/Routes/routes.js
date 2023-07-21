import express from 'express';
import {
  createDepartment, getAllDepartments, getDepartmentById, updateDepartmentById, deleteDepartmentById,
} from '../Controller/departmentController.js';

import {
   makeRoleInactive , listRoles, createRole, getAllRoles, getRoleById, updateRoleById, deleteRoleById,
} from '../Controller/roleController.js';

import {
  createEmployee, getAllEmployees, getEmployeeById, updateEmployeeById , deleteEmployeeById, makeEmployeeInactive, listUsersByManager,
} from '../Controller/employeeConroller.js'

const router = express.Router();

/************************************ */
// API are listed in the use cases
/************************************ */

// Create a new role
router.post('/roles', createRole);

// Update a role by role ID
router.put('/roles/:role_id', updateRoleById);

// Myself (Gabriel Worked API Function)
// API to make the role inactive
router.put('/ract/:role_id', makeRoleInactive);

// List the active and In-active roles
router.post('/active', listRoles);

// Get a role by role ID
router.get('/roles/:role_id', getRoleById);

// Create a new employee
router.post('/employees', createEmployee);

// Update an employee by emp_id
router.put('/employees/:emp_id', updateEmployeeById);

// Myself (Gabriel Worked API Function)
// Make an employee inactive by emp_id
router.put('/employees/inactive/:emp_id', makeEmployeeInactive);

// Myself (Gabriel Worked API Function)
// Route to list users with a filter by manager's role_name
router.get('/users', listUsersByManager);

// Get an employee by emp_id
router.get('/employees/:emp_id', getEmployeeById);

// Delete an employee by emp_id
router.delete('/employees/:emp_id', deleteEmployeeById);


/************************************ */
// Extra API not listed in the use cases
/************************************ */

// Create a new department
router.post('/departments', createDepartment);

// Get all departments
router.get('/departments', getAllDepartments);

// Get all roles
router.get('/roles', getAllRoles);

// Delete a role by role ID
router.delete('/roles/:role_id', deleteRoleById);

// Get a department by department ID
router.get('/departments/:id', getDepartmentById);

// Update a department by department ID
router.put('/departments/:id', updateDepartmentById);

// Delete a department by department ID
router.delete('/departments/:id', deleteDepartmentById);

// Get all employees
router.get('/employees', getAllEmployees);

export default router;

