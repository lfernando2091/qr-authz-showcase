export class QRAuthZApiError extends Error {
    code: number;

    constructor(message: string, code: number = 500) {
        super(message); // Call the base Error class constructor
        this.code = code;
        this.name = 'QRAuthZApiError'; // Good practice to set a specific name

        // Essential for correct prototype chain when transpiling to ES5/ES6
        // (ensure instanceof checks work as expected)
        Object.setPrototypeOf(this, QRAuthZApiError.prototype);
    }
}