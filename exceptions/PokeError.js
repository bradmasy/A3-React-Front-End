
class PokeError extends Error{
    constructor(message) {
        super(message);
        this.name = 'PokeError';
        this.errorCode = 400;
      }

     showMessage = () => {
        console.log(this.message);
      }

      
    getErrorCode = () => {
        return this.errorCode;
    }
}


module.exports = PokeError;