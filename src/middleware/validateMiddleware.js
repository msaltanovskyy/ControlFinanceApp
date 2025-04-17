const validator = require('deep-email-validator'); //email validator
const { model } = require('mongoose');

const validateEmail = async (email) => {

    const { valid, reason } = await validator.validate(email);
    if (!valid) {
        let errorMessage;
    
        // Customize error messages based on the reason
        switch (reason) {
            case 'tooGeneric':
                errorMessage = 'The email address is too generic. Please use a more specific email address.';
                break;
            case 'smtp':
                errorMessage = 'The email domain is not reachable. Please check the email address for typos or try a different one.';
                break;
            case 'invalid':
                errorMessage = 'The email address format is invalid. Please ensure it follows the format: user@example.com.';
                break;
            case 'disposable':
                errorMessage = 'The email address is from a disposable email provider. Please use a permanent email address.';
                break;
            case 'unknown':
            default:
                errorMessage = 'The email address is not valid. Please try again!';
                break;
        }
        
        return {valid:false, errorMessage}
    }

    return {valid:true, errorMessage: null}
};

module.exports = {
    validateEmail,
}