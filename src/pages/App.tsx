import React, {Component} from 'react'
import {Provider} from 'mobx-react'
import RootStore from '../models/RootStore'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MessageList from "./MessageList";
import Colors from "../config/colors";
import {Button, View} from "react-native";
import MessageViewModel from "../models/domain/MessageViewModel";
import UserViewModel from "../models/domain/UserViewModel";
import UserController from "../components/user/UserController";
import Intro from "./Intro";
import WebsocketController from "../components/websocket/WebsocketController";

const Stack = createNativeStackNavigator();

class App extends Component {

  private rootStore = new RootStore()
  public viewModel: MessageViewModel;
  private userViewModel: UserViewModel;

  constructor(props: any) {
    super(props);
    const {MessageModel, UserModel} = this.rootStore.getStores()
    this.userViewModel = new UserViewModel(UserModel);
    this.viewModel = new MessageViewModel(MessageModel);
  }

  render() {
    return (
        <Provider {...this.rootStore.getStores()}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro" screenOptions={{
              headerStyle: {
                backgroundColor: Colors.brandPrimary,
              },
              headerTintColor: Colors.white,
              headerTitleStyle: {fontWeight: 'bold',}
            }}>
              <Stack.Screen name="Intro" options={{headerShown: false, gestureEnabled: false}} >
                {props => <Intro {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Home" options={({navigation, route}) => ({
                headerRight: () => (<Button
                    onPress={() => navigation.push('Messages', {viewModel: this.viewModel})}
                    title="Activity log"
                    color="#fff"
                />),
                headerLeft: () => <View/>,
                gestureEnabled: false,
                title: "Home"
              })}>
                {props => <WebsocketController {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="Messages" component={MessageList}
                            options={{gestureEnabled: true, title: 'Recent activity'}}/>
              <Stack.Screen name="UserFormView" component={UserController}
                            options={{gestureEnabled: false, title: 'Your profile', headerLeft: () => <View/>}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    )
  }
}

export default App