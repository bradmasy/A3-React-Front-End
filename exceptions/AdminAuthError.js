const PokeError = require("../exceptions/PokeError");


class AdminAuthError extends PokeError{

    constructor(message){
        super(message);
        this.message = message;
        this.errorCode = 405;
    }
}

module.exports = AdminAuthError;