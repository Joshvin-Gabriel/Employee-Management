import { SuccessResponse, ErrorResponse } from '../Response/Response.js';

// Handle the response after updating the employee
const handleEmployeeUpdateResponse = (res, is_active_flag, updatedEmployee) => {
    
  // Extract the desired fields from the updatedEmployee object
  const data = {
    employee_id: updatedEmployee.emp_id,
    firstname: updatedEmployee.firstname,
    lastname: updatedEmployee.lastname,
    active_flag: updatedEmployee.is_active_flag,
  };
  console.log('Employee marked as inactive:', data);
  const message = `Employee marked as ${is_active_flag ? 'active' : 'inactive'}`;
  const response = new SuccessResponse(message, data);
  res.status(200).json(response);
};

// Handle the response when an error occurs during the update
const handleEmployeeUpdateError = (res, error) => {
  console.error('Error updating employee:', error);

  let errorMessage = 'Failed to update employee';
  if (typeof error === 'string') {
    errorMessage = error; // If the error is a string (validation error), use it as the error message
  }

  const response = new ErrorResponse(errorMessage);
  res.status(500).json(response);
};

// Handle the response for listByManagers when successful
const handleListByManagersSuccess = (res, filteredUsers) => {
    console.log('Filtered Users:', filteredUsers);

      // Extract the desired fields from each user object in the filteredUsers array
  const data = filteredUsers.map(user => ({
    employee_id: user.emp_id,
    firstname: user.firstname,
    lastname: user.lastname,
    active_flag: user.is_active_flag,
  }));
    const response = new SuccessResponse('Users fetched successfully', data);
    res.status(200).json(response);
  };
  
  // Handle the response for listByManagers when no users found
  const handleListByManagersNoUsersFound = (res) => {
    const response = new ErrorResponse('No users found');
    res.status(404).json(response);
  };
  
  // Handle the response for listByManagers when an error occurs
  const handleListByManagersError = (res, error) => {
    console.error('Error fetching users:', error);
  
    let errorMessage = 'Failed to fetch users';
    if (typeof error === 'string') {
      errorMessage = error; // If the error is a string (e.g., database error), use it as the error message
    }
  
    const response = new ErrorResponse(errorMessage);
    res.status(500).json(response);
  };

export { 
    handleEmployeeUpdateResponse, 
    handleEmployeeUpdateError,
    handleListByManagersSuccess, 
    handleListByManagersNoUsersFound, 
    handleListByManagersError
};
