import MessageModel from './domain/MessageModel'
import UserModel from "./domain/UserModel";

class RootStore {
    static type = {
        MESSAGES_MODEL: 'MessageModel',
        USER_MODEL: 'UserModel'
    }

    constructor() {
        this.messageModel = new MessageModel()
        this.userModel = new UserModel()
    }

    getStores = () => ({
        [RootStore.type.MESSAGES_MODEL]: this.messageModel,
        [RootStore.type.USER_MODEL]: this.userModel
    })
}

export default RootStore