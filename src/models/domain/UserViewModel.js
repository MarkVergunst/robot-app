import AsyncStorage from "@react-native-async-storage/async-storage";

class UserViewModel {
    constructor(userModel) {
        if (UserViewModel._instance) {
            return UserViewModel._instance
        }
        UserViewModel._instance = this;
        this.store = userModel
        this.getUsernameFromStorage()
    }

    async getUsernameFromStorage() {
        const username = await AsyncStorage.getItem("username")
        if (username) {
            this.setUsername(username)
        }
    }

    getUsername() {
        return this.store.getUsername();
    }

    getUsernameLength() {
        let username = this.store.getUsername() || "";
        return username.length
    }

    setUsername(username) {
        AsyncStorage.setItem("username", username)
        this.store.setUsername(username);
    }

    getUserId() {
        return this.store.getUserId();
    }

    getUserById(id) {
        return this.store.getUserById(id);
    }

}

export default UserViewModel