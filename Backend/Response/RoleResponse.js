import { SuccessResponse, ErrorResponse } from '../Response/Response.js';

// Handle the response after updating the employee
const handleRoleUpdateResponse = (res, is_active_flag, updatedRole) => {
    
  // Extract the desired fields from the updatedEmployee object
  const data = {
    rolename: updatedRole.role_name,
    roleid: updatedRole.role_id,
    department_name: updatedRole.dept_name,
    active_flag: updatedRole.is_active_flag,
  };
  console.log('Role marked as inactive:', data);
  const message = `Role marked as ${is_active_flag ? 'active' : 'inactive'}`;
  const response = new SuccessResponse(message, data);
  res.status(200).json(response);
};

// Handle the response when an error occurs during the update
const handleRoleUpdateError = (res, error) => {
    console.error('Error updating employee:', error);
  
    let errorMessage = 'Failed to update employee';
    if (typeof error === 'string') {
      errorMessage = error; // If the error is a string (validation error), use it as the error message
    }
  
    const response = new ErrorResponse(errorMessage);
    res.status(500).json(response);
  };

export { 
    handleRoleUpdateResponse,
    handleRoleUpdateError
};