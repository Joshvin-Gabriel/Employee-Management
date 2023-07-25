import { body, param, validationResult } from 'express-validator';

const prepareEmployeeInactiveData = (req) => {
  // Validation and sanitization rules for request fields
  const validations = [
    param('emp_id').isInt().withMessage('Employee ID must be an integer'),
    body('is_active_flag').isBoolean().withMessage('is_active_flag must be a boolean'),
  ];

  // Run validations
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

export { prepareEmployeeInactiveData };
