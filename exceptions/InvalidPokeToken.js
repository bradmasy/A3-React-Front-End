const PokeError = require("../exceptions/PokeError");


class InvalidPokeToken extends PokeError{

    constructor(message){
        this.message = message;
        this.errorCode = 402;
    }
}

module.exports = InvalidPokeToken;