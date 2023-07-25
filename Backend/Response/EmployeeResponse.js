import { SuccessResponse, ErrorResponse } from '../Response/Response.js';

// Handle the response after updating the employee
const handleEmployeeUpdateResponse = (res, is_active_flag, updatedEmployee) => {
  console.log('Employee marked as inactive:', updatedEmployee);
  const message = `Employee marked as ${is_active_flag ? 'active' : 'inactive'}`;
  const response = new SuccessResponse(message, updatedEmployee);
  res.status(200).json(response);
};

// Handle the response when an error occurs during the update
const handleEmployeeUpdateError = (res, error) => {
  console.error('Error updating employee:', error);
  const response = new ErrorResponse('Failed to update employee');
  res.status(500).json(response);
};

export { handleEmployeeUpdateResponse, handleEmployeeUpdateError };
