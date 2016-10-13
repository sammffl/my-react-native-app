/**
 * Created by SamMFFL on 2016/10/10.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
} from 'react-native';

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        // color: 'white',
        margin: 50,
    },
});

class Edit extends Component {
    render() {
        return (
            <View style={styles.tabContent}>
                <Text style={styles.tabText}>2</Text>
            </View>
        );
    }
}

export default Edit;