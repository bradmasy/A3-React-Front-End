const PokeError = require("../exceptions/PokeError");

class PokeAuthError extends PokeError{

    constructor(message){
        super(message);
        this.errorCode = 401;
    }

    getErrorCode(){
        return this.errorCode;
    }

    
}

module.exports = PokeAuthError;