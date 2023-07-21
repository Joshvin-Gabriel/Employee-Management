import Employee from '../Model/employeeModel.js';
import Department from '../Model/departmentModel.js';
import Role from '../Model/roleModel.js';

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const departmentName = employeeData.dept_name;
    const roleName = employeeData.role_name;

    // Find the department based on the department name
    const department = await Department.findOne({ dept_name: departmentName });

    if (!department) {
      return res.status(400).json({ error: 'Invalid department name' });
    }

    // Find the role based on the role name
    const role = await Role.findOne({ role_name: roleName });

    if (!role) {
      return res.status(400).json({ error: 'Invalid role name' });
    }

    // Set the department ID and role ID in the employeeData
    employeeData.dept_id = department.dept_id;
    employeeData.role_id = role.role_id;

    // Create a new employee with the updated employeeData
    const newEmployee = new Employee(employeeData);
    const savedEmployee = await newEmployee.save();

    console.log('Employee created:', savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log('All employees:', employees);
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// Get an employee by emp_id
const getEmployeeById = async (req, res) => {
  try {
    const emp_id = req.params.emp_id;
    const employee = await Employee.findOne({ emp_id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log('Employee found:', employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

// Update an employee by emp_id
const updateEmployeeById = async (req, res) => {
  try {
    const emp_id = req.params.emp_id;
    const employeeData = req.body;
    const updatedEmployee = await Employee.findOneAndUpdate(
      { emp_id },
      employeeData,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log('Employee updated:', updatedEmployee);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

// Delete an employee by emp_id
const deleteEmployeeById = async (req, res) => {
  try {
    const emp_id = req.params.emp_id;
    const deletedEmployee = await Employee.findOneAndDelete({ emp_id });
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    console.log('Employee deleted:', deletedEmployee);
    res.status(200).json(deletedEmployee);
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

// Make an employee inactive by emp_id
const makeEmployeeInactive = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const { is_active_flag } = req.body; 

    // Find the employee by emp_id and update the is_active_flag
    const updatedEmployee = await Employee.findOneAndUpdate(
      { emp_id },
      { is_active_flag: is_active_flag },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    console.log('Employee marked as inactive:', updatedEmployee);
    res.status(200).json({ message: `Employee marked as ${is_active_flag ? 'active' : 'inactive'}`, updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

// Function to list all users and filter by manager's or Any roles in role_name on the Frontend client-side
const listUsersByManager = async (req, res) => {
  try {
    // Fetch all employees
    const allUsers = await Employee.find({});

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    console.log('All Users:', allUsers);

    const { role_name } = req.body; 
    console.log('Request Body:', req.body); 

    let filteredUsers = allUsers;
    if (role_name) {
      const regex = new RegExp(`.*${role_name}.*`, 'i');
      filteredUsers = allUsers.filter((user) => user.role_name.match(regex));
    }

    console.log('Filtered Users:', filteredUsers); 

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Export all the functions to the routes
export {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  makeEmployeeInactive,
  listUsersByManager,
};
