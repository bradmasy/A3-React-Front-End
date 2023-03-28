const PokeError = require("../exceptions/PokeError");


class IllegalArgumentError extends PokeError{

    constructor(message){
        super(message);
        this.message = message;
        this.errorCode = 406;
    }
}

module.exports = IllegalArgumentError;