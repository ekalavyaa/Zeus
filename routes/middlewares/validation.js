let jsonResponse = require('../response_generator/generation.functions');

let getValidationInstance = (req, ruleNamePrefix, field, message) => {
	switch(ruleNamePrefix) {
		case 'q':
			return req.checkQuery(field, field + message);
			break;
		case 'p':
			return req.checkParams(field, field + message);
			break;
		case 'b':
			return req.checkBody(field, field + message);
			break;
		default:
			console.log('Unknown validation type : ' + ruleNamePrefix);
			throw new Error('rule not supported');
	}
};

let returnResponse = (err, res, next ) => {
	if(err) {
		return res.json(jsonResponse.validation(err));
	} else {
		next();
	}
};

exports.validate = (validationRules) => {
	return (req, res, next) => {
		Object.keys(validationRules).forEach(function(rule) {
			var fieldsApplicableToRule = validationRules[rule];

			fieldsApplicableToRule.forEach(function(field) {
				var ruleName = rule.split(':');
				switch(ruleName[1]) {
					case 'not_empty':
						getValidationInstance(req, ruleName[0], field, ' required').notEmpty();
					break;
					case 'is_email':
						getValidationInstance(req, ruleName[0], field, ' is not a valid email').isEmail();
					break;
					case 'is_int':
						getValidationInstance(req, ruleName[0], field, ' is not a valid number').isInt();
					break;
					case 'is_bool':
						getValidationInstance(req, ruleName[0], field, ' is not a valid boolean').isBoolean();
					break;
					case 'is_valid_role':
						getValidationInstance(req, ruleName[0], field, ' is not a valid role').validRole();
					break;
					case 'is_array':
						getValidationInstance(req, ruleName[0], field, ' is not a valid array').isArray();
					break;
					case 'is_length':
						getValidationInstance(req, ruleName[0], field, ' does not have a valid length').isLength(ruleName[2],ruleName[3]);
					break;
					case 'is_number':
						getValidationInstance(req, ruleName[0], field, ' is not a valid number').isNumeric();
					break;
					case 'is_range':
						getValidationInstance(req, ruleName[0], field, ' is not a valid number').isRange(ruleName[2],ruleName[3]);
					break;
					case 'is_multiple':
						getValidationInstance(req, ruleName[0], field, ' is not a valid number').isMultiple(ruleName[2]);
					break;
					case 'is_valid_poll_content':
						getValidationInstance(req, ruleName[0], field, ' is not a valid content').isValidPollContent(ruleName[2]);
					break;
					default:
					// eslint-disable-next-line no-console
					console.log('Unknown validation type ');
					throw new Error('rule not supported');

				}
			});
		});
		returnResponse (req.validationErrors(), res, next);		
	};
};