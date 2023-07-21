import Department from '../Model/departmentModel.js';
import Employee from '../Model/employeeModel.js';

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const { dept_name, inserted_by_name } = req.body;

    console.log('Received request to create a new department:', req.body);

    // Find the corresponding Employee document by name
    const insertedByEmployee =  Employee.findOne({ firstname: inserted_by_name });

    if (!insertedByEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Get the ObjectId of the Employee and use it as "inserted_by"
    const newDepartment = new Department({
      dept_name,
      inserted_by: insertedByEmployee._id,
    });

    const savedDepartment = await newDepartment.save();
    console.log('New department created and saved:', savedDepartment);

    res.status(201).json(savedDepartment);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Failed to create department' });
  }
};


// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    console.log('Fetched all departments:', departments);

    res.status(200).json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};


// Get a department by department ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findOne({ dept_id: req.params.id });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch department' });
  }
};

// Update a department by department ID
const updateDepartmentById = async (req, res) => {
  try {
    const { dept_name, updated_by } = req.body;
    const updatedDepartment = await Department.findOneAndUpdate(
      { dept_id: req.params.id },
      { dept_name, updated_by, updated_date: new Date() },
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update department' });
  }
};

// Delete a department by department ID
const deleteDepartmentById = async (req, res) => {
  try {
    const deletedDepartment = await Department.findOneAndDelete({
      dept_id: req.params.id,
    });
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(deletedDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete department' });
  }
};

// Export all the functions to the Routes
export {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
