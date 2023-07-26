import { body, param, validationResult } from 'express-validator';
// import { SuccessResponse, ErrorResponse } from '../Response/Response.js';

const prepareEmployeeInactiveData = async (req) => {
  // Validation and sanitization rules for request fields
  const validations = [
    param('emp_id').isInt().withMessage('Employee ID must be an integer'),
    body('is_active_flag').isBoolean().withMessage('Active flag must be a boolean'),
  ];

  // Run validations using the validation middleware
  await Promise.all(validations.map(validation => validation.run(req)));

  // Check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw new Error(errorMessages.join(', '));
  }

  // Extract and parse request data
  const { emp_id } = req.params;
  const { is_active_flag } = req.body;
  const isActiveFlag = JSON.parse(is_active_flag);

  return { emp_id, is_active_flag: isActiveFlag };
};


const prepareListUsersByManagerData = async (req) => {
    // Validation and sanitization rules for request fields
    const { page, perPage } = req.query;
    const { role_name } = req.body;
  
    const validations = [
      param('page').optional().isInt().withMessage('Page must be an integer'),
      param('perPage').optional().isInt().withMessage('PerPage must be an integer'),
      role_name && body('role_name').isString().withMessage('Role name must be a string'),
    ];
  
    // Run validations using the validation middleware
    await Promise.all(validations.map(validation => validation.run(req)));
  
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      throw new Error(errorMessages.join(', '));
    }
  
    // Extract and parse request data
    const filter = role_name ? { role_name: new RegExp(role_name, 'i') } : {};
    const pageValue = parseInt(page, 10) || 1;
    const perPageValue = parseInt(perPage, 10) || 10;
  
    return { filter, page: pageValue, perPage: perPageValue };
  };
  
  

export { prepareEmployeeInactiveData , prepareListUsersByManagerData };
