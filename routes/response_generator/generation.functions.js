let config = require('./generator.config');
exports.success = (msg, data) => {
    config.successMessage.message = msg;
    config.successMessage.data = data;
    return config.successMessage;
};

exports.failure = (msg,data) => {
    config.failureMessage.message = msg;
    config.failureMessage.data = data;
    return config.failureMessage;
};

exports.validation = (data) => {
    config.validationFaliure.data = data;
    return config.validationFaliure
};