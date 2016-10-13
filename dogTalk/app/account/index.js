/**
* @Author: shenyu <SamMFFL>
* @Date:   2016/10/10 17:41:24
* @Email:  samfec@163.com
* @Last modified by:   SamMFFL
* @Last modified time: 2016/10/13 11:40:48
*/


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900"/>)

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

class Account extends Component {
    render() {
        return (
            <View style={styles.tabContent}>
                <Text style={styles.tabText}>3</Text>
                <Image
                    source={{uri:'http://dummyimage.com/1200x600/a33ad2'}}
                    style={{width:50,height:50, borderWidth:1}}
                    resizeMode="stretch"
                />
                <Image
                    source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}
                    style={{width:50,height:50, borderWidth:1}}
                    resizeMode="stretch"
                />
                {myIcon}
            </View>

        );
    }
}

export default Account;
