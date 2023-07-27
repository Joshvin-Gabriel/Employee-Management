import { body, param, validationResult } from 'express-validator';

// Role request validation and sanitization
const prepareRoleData = async (req) => {
  // Validation and sanitization rules for request fields
  const { role_id } = req.params;
  const roleIdNumber = parseInt(role_id, 10);
  const { is_active_flag } = req.body;

  const validations = [
    param('role_id').isInt().withMessage('Role ID must be an integer'),
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

  return { role_id: roleIdNumber, is_active_flag };
};

export { prepareRoleData };
