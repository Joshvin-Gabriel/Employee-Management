const prepareEmployeeInactiveData = (req) => {
    const { emp_id } = req.params;
    const { is_active_flag } = req.body;
  
    // Parse the is_active_flag as a boolean
    const isActiveFlag = JSON.parse(is_active_flag);
  
    // Validate is_active_flag
    if (typeof isActiveFlag !== 'boolean') {
      throw new Error('Invalid value for is_active_flag. Must be a boolean.');
    }
  
    // Return the data required for database update
    return { emp_id, is_active_flag };
  };
  
  export { prepareEmployeeInactiveData };
  