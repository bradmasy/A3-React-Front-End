const PokeError = require("../exceptions/PokeError");


class IllegalRouteException extends PokeError{

    constructor(message){
        super(message);
        this.message = message;
        this.errorCode = 408;
    }
}

module.exports = IllegalRouteException;