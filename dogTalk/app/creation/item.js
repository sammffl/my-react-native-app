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
    item: {
        width: Cwidth,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: '#333',
    },
    thumb: {
        width: Cwidth,
        height: Cwidth * 0.56,
        // resizeMode: 'cover',
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: Cwidth / 2 - 0.5,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    play: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        color: '#ed7b66',
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333',
    },
    up: {
        color: '#ed7b66',
        fontSize: 22,
    },
    down:{
        color: '#333',
        fontSize: 22,
    },
    commentIcon: {
        color: '#333',
        fontSize: 22,
    },
});

class Item extends Component {
    constructor(props) {
        super(props);
        let row = props.row;

        this.state = {
            up: row.voted,
            row: row,
            isUping: false,
        }
        this._up = this._up.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            row: nextProps.row,
            up: nextProps.row.voted,
        });
    }

    _up(){
        if(this.state.isUping){
            return;
        }
        this.setState({
            isUping:true,
        })
        // let self =this;
        let up = !this.state.up;
        let row = this.state.row;
        let url = config.api.base + config.api.up
        console.log(up);
        var body = {
            id: row._id,
            up: up,
            accessToken: 'abcd'
        }

        request.post(url,body).then((res) => {
            if (res && res.success) {
                this.setState({
                    up: up,
                });
            } else {
                AlertIOS.alert('点赞失败，稍后重试');

            }

            this.setState({
                isUping:false
            })
        }).catch((err) => {
            console.log(err);
            AlertIOS.alert('点赞失败，稍后重试');
            this.setState({
                isUping:false
            })
        })
        // if(this.state.up){
        //     return;
        // }
        // this.setState({
        //     up:true,
        // });
    }

    render(){
        let row = this.state.row;

        return (
            <TouchableHighlight onPress={this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <Image
                        style={styles.thumb}
                        source={{uri: row.thumb}}
                        resizeMode="stretch"
                    >
                        <Icon name="ios-play" size={28} style={styles.play}/>
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon
                                name={ this.state.up ? "ios-heart" : "ios-heart-outline"}
                                size={28}
                                onPress={this._up}
                                style={[styles.up, this.state.up ? null : styles.down]}
                            />
                            <Text
                                style={styles.handleText}
                                onPress={this._up}
                            >喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Icon name="ios-chatboxes-outline" size={28} style={styles.commentIcon}/>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default Item;
