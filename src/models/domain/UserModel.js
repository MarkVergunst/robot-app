import {action} from 'mobx'
import {uuid} from "../../utils/uuid";


class UserModel {
    username = "";
    id;

    @action setUsername(username) {
        this.username = username;
        this.id = uuid();
    }

    @action getUserId() {
        return this.id
    }

    @action getUserById(id) {
        if (id === this.id) {
            return this.username
        }

        return "Anonymous"
    }

    @action getUsername() {
        return this.username
    }
}

export default UserModel