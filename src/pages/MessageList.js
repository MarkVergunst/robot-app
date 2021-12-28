import {FlatList, Text, View, StyleSheet, TouchableHighlight} from "react-native";
import React from "react";
import Colors from "../config/colors";
import DateFormatter from "../utils/dateformatter";

const Styles = StyleSheet.create({
    listItemContainer: {
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    listDesign: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        width: '100%'
    },
    title: {
        paddingLeft: 14,
        paddingRight: 4,
        fontSize: 14,
        color: Colors.blue,
        fontWeight: 'normal',
        width: "65%",
        textAlign: "right"
    },
    username: {
        width: "35%",
        paddingLeft: 12,
        fontSize: 16,
        color: Colors.blue,
        fontWeight: 'bold'
    },
    text: {
        marginLeft: 12,
        fontSize: 17,
        color: Colors.black,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.creamyWhite,
    },
    listContainer: {
        flexDirection: 'row',
        padding: 2,
    },
    columnAlign: {
        flexDirection: 'column'
    }
});

class MessageList extends React.Component {

    render() {
        const {route} = this.props
        const {viewModel} = route.params;
        return (
            <FlatList style={Styles.container}
                      data={viewModel.getSortedMessages()}
                      keyExtractor={(item, index) => item.id}
                      renderItem={({item, index}) => (
                          this.renderRow(item, index)
                      )}
                      ListEmptyComponent={this.showEmptyListView()}
            />
        );


    }

    showEmptyListView = () => {
        return (
            <View
                style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10, height: 400}}>
                <Text style={{color: Colors.black}}>{"No Data to Display"}</Text>
            </View>
        )
    }

    formatDate = (date) => {
        return DateFormatter.convert(date);
    }

    renderRow = (item, index) => {

        return (
            <TouchableHighlight key={index} onPress={() => this.onPressAction(item)}>
                <View style={Styles.listItemContainer}>
                    <View style={Styles.listDesign}>
                        <View style={Styles.columnAlign}>
                            <View style={Styles.listContainer}>
                                <Text style={Styles.username}>@{item.username}</Text>
                                <Text style={[Styles.title]}>{this.formatDate(item.timestamp)}</Text>
                            </View>
                            <View style={Styles.listContainer}>
                                <Text style={Styles.text}>{item.message}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableHighlight>
        );

    }

    onPressAction(item) {
        return undefined;
    }
}

export default MessageList
