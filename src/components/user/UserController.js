import React from "react";
import {inject} from "mobx-react";
import RootStore from "../../models/RootStore";
import UserViewModel from "../../models/domain/UserViewModel";
import UserProfileView from "./UserProfileView";


@inject(RootStore.type.USER_MODEL)
class UserController extends React.Component {
    static usernameMaxLength = 50;
    static usernameMinLength = 3;
    state = {
        username: "",
        usernameValid: false,
        usernameLength: 0,
        tried: false
    }

    constructor(props) {
        super(props);
        const userModel = props[RootStore.type.USER_MODEL];
        this.viewModel = new UserViewModel(userModel);
    }

    setUsername = (username) => {
        if (!this.state.tried) {
            this.setState({tried: true})
        }

        if (username !== this.state.username) {
            this.setState({username: username, usernameLength: username.length});
        }

        if (username.length > UserController.usernameMinLength || username.length > UserController.usernameMaxLength) {
            this.setState({usernameValid: true})
        } else {
            this.setState({usernameValid: false})
        }
    }

    saveUsername = () => {
        this.setState({tried: true})
        if (this.state.usernameValid) {
            this.viewModel.setUsername(this.state.username);
            this.props.navigation.navigate('Home')
        } else {
            this.setState({usernameValid: false})
        }
    }

    componentDidMount() {
        this.setUsername(this.viewModel.getUsername())
        this.setState({tried: false})
    }

    render() {

        const usernameValidation = (!this.state.usernameValid && this.state.usernameLength >= 0 && this.state.tried)
            ? "Username needs te be at least 4 characters" : "";

        return (
            <UserProfileView
                SetUsername={this.setUsername}
                Username={this.state.username}
                SaveUsername={this.saveUsername}
                UsernameValidationText={usernameValidation}
            />
        )
    }
}

export default UserController