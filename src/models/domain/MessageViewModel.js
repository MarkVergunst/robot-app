class MessageViewModel {
    constructor(messageModel) {
        if (MessageViewModel._instance) {
            return MessageViewModel._instance
        }
        MessageViewModel._instance = this;
        this.store = messageModel
    }

    getAllMessages() {
        return this.store.getMessages()
    }

    getSortedMessages(sortorder = "ASC") {
        return this.getAllMessages().sort(function (a, b) {
            if (sortorder === "ASC") {
                return new Date(b.timestamp) - new Date(a.timestamp);
            } else {
                return new Date(a.timestamp) - new Date(b.timestamp);
            }
        });
    }

    addMessage(message, username) {
        this.store.addMessage(message, username);
    }

    clearAllMessages() {
        this.store.clearAll();
    }

    getLastMessage() {
        let messages = this.store.getMessages();
        return messages[messages.length - 1];
    }
}

export default MessageViewModel