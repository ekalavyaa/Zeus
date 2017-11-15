let config = {
    err_res:-1,
    success_res:1,
    val_err:3,
    val_message: 'Validation Failure'
};

let successMessage = {
    status: config.success_res
};

let failureMessage = {
    status: config.err_res
};

let validationFaliure = {
    status: config.val_err,
    message: config.val_message
};

module.exports = {
    successMessage:successMessage,
    failureMessage:failureMessage,
    validationFaliure:validationFaliure
};