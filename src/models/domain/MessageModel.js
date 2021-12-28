import {observable, action} from 'mobx'
import {uuid} from "../../utils/uuid";


class MessageModel {
    @observable messages = []

    @action addMessage(message, username) {
        this.messages.push({
            id: uuid(),
            timestamp: new Date().toString(),
            message: message,
            username: username
        })
    }

    @action clearAll() {
        this.messages = [];
    }

    @action getMessages() {
        return this.messages
    }

}

export default MessageModel