export class Success {
    constructor(data) {
        this.success = true;
        this.data = data;
    };
};

export class SuccessMsg {
    constructor(message, data) {
        this.success = true;
        this.message = message;
        this.data = data;
    };
};

export class SuccessToken {
    constructor(token, type, message) {
        this.success = true;
        this.data = { message, access_token: token, type_token: type };
    };
};