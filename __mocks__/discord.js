
exports.client = {
    config: {
        embedColor: '#F00'
    }
};

exports.message = {
    reply: jest.fn(),
    channel: {
        send: jest.fn()
    }
};

exports.MessageEmbed = class {
    constructor() {
        this.setColor = jest.fn();
        this.setDescription = jest.fn();
    }
};
