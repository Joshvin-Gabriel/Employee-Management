////////////////////////////////////////////////////////////////////////////////
// Updating the informaion in routes body and done the santization
////////////////////////////////////////////////////////////////////////////////

import express from 'express';
import { body, param, validationResult } from 'express-validator';

import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
} from '../Controller/departmentController.js';

import {
  makeRoleInactive,
  listRoles,
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
} from '../Controller/roleController.js';

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  makeEmployeeInactive,
  listUsersByManager,
} from '../Controller/employeeConroller.js';

const router = express.Router();

/************************************ */
// API are listed in the use cases
/************************************ */

// Create a new role
router.post(
  '/roles',
  body('role_name').isString().withMessage('Role name must be a string'),
  createRole
);

// Update a role by role ID
router.put(
  '/roles/:role_id',
  param('role_id').isInt().withMessage('Role ID must be an integer'),
  body('role_name').isString().withMessage('Role name must be a string'),
  updateRoleById
);

// Myself (Gabriel Worked API Function)
// API to make the role inactive
router.put('/ract/:role_id', makeRoleInactive);

// List the active and In-active roles
router.post('/active', listRoles);

// Get a role by role ID
router.get('/roles/:role_id', getRoleById);

// Create a new employee
router.post('/employees',
  body('firstname').isString().withMessage('First name must be a string'),
  body('lastname').isString().withMessage('Last name must be a string'),
  body('gender').isString().withMessage('Gender must be a string'),
  body('address').isString().withMessage('Address must be a string'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('mobile_no').isNumeric().withMessage('Mobile number must be a valid number'),
  body('age').isFloat({ min: 10 }).withMessage('Age must be a valid number greater than or equal to 10'),
  body('date_of_join').isISO8601().withMessage('Invalid date format for date_of_join'),
  body('dept_name').isString().withMessage('Department name must be a string'),
  body('role_name').isString().withMessage('Role name must be a string'),
  body('inserted_by').isString().withMessage('Inserted by must be a string'),
  createEmployee
);

// Update an employee by emp_id
router.put(
  '/employees/:emp_id',
  param('emp_id').isInt().withMessage('Employee ID must be an integer'),
  body('firstname').isString().withMessage('First name must be a string'),
  body('lastname').isString().withMessage('Last name must be a string'),
  // Add more validation rules for other fields...
  updateEmployeeById
);

// Myself (Gabriel Worked API Function)
// Make an employee inactive by emp_id
router.put('/employees/inactive/:emp_id',
param('emp_id').isInt().withMessage('Employee ID must be an integer'),
 makeEmployeeInactive);

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
router.put(
  '/departments/:id',
  param('id').isInt().withMessage('Department ID must be an integer'),
  body('department_name').isString().withMessage('Department name must be a string'),
  // Add more validation rules for other fields...
  updateDepartmentById
);

// Delete a department by department ID
router.delete('/departments/:id', deleteDepartmentById);

// Get all employees
router.get('/employees', getAllEmployees);

export default router;
