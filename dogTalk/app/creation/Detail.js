import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ListView,
    TouchableHighlight,
    Dimensions,
    ActivityIndicator,
    RefreshControl,//下拉刷新空间
    AlertIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import Mock from 'mockjs';
import request from '../common/request';
import config from '../common/config.json';

const Cwidth = Dimensions.get('window').width;
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
class Detail extends Component {
    constructor(props){
        super(props);
        this._backToList = this._backToList.bind(this);
    }

    _backToList(){
        this.props.navigator.pop();
    }

    render(){
        return (
            <View style={styles.tabContent}>
                <Text
                    style={styles.tabText}
                    onPress={this._backToList}
                >详情页面</Text>
            </View>
        );
    }
}

export default Detail;
