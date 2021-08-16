class Message{
    constructor(message, author) {
        this.message = message;
        this.author = author;
        this.date= new Date();
    }
}

module.exports = Message;