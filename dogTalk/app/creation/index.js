/**
 * Created by SamMFFL on 2016/10/10.
 */

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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import Mock from 'mockjs';
import request from '../common/request';
import Item from './item';
import Detail from './Detail';


const Cwidth = Dimensions.get('window').width;
let cachedResult = {
    nextPage: 1,
    items: [],
    total: 0
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#f5fcff',
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center',
    },
});

class List extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoadingTail: false,
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false,
        };

        this._renderRow = this._renderRow.bind(this);
        this._fetchData = this._fetchData.bind(this);
        this._fetchMoreData = this._fetchMoreData.bind(this);
        this._hasMoreData = this._hasMoreData.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._loadPage = this._loadPage.bind(this);
    }

    _renderRow(row) {
        return (
            <Item
                key={row._id}
                onSelect={() => this._loadPage(row)}
                row={row}
            />
        );
    }

    _renderFooter() {
        if (!this._hasMoreData() && cachedResult.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            );
        }
        if (!this.state.isLoadingTail) {
            return <View/>
        }
        return (
            <ActivityIndicator style={styles.loadingMore}/>
        );
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData(page = 1) {

        if (page !== 0) {
            this.setState({
                isLoadingTail: true,
            });
        }else{
            this.setState({
                isRefreshing: true,
            });
        }


        console.log('fetchData')
        const url = 'http://rap.taobao.org/mockjs/8378/api/creations';
        request.get(url, {
            accessToken: 'asdv',
            page: page,
        }).then((data) => {
            if (data.success) {
                let items = cachedResult.items.slice();

                if (page !== 0 ){
                    items = items.concat(data.data);
                    cachedResult.nextPage = (cachedResult.nextPage < Math.ceil(cachedResult.total / 10.0) ) ? cachedResult.nextPage + 1 : Math.ceil(cachedResult.total / 10.0)
                } else {
                    items = data.data.concat(items);
                }

                cachedResult.items = items;
                cachedResult.total = data.total;

                console.log(page);
                console.log(data);
                console.log(cachedResult.items)

                if (page !== 0 ){
                    this.setState({
                        isLoadingTail: false,
                        dataSource: this.state.dataSource.cloneWithRows(cachedResult.items)
                    });
                } else {
                    this.setState({
                        isRefreshing: false,
                        dataSource: this.state.dataSource.cloneWithRows(cachedResult.items)
                    });
                }

            }
        }).catch((error) => {
            if (page !== 0) {
                this.setState({
                    isLoadingTail: false
                });
            } else {
                this.setState({
                    isRefreshing: false
                });
            }

            console.log(error);
        })

    }

    _hasMoreData() {
        return cachedResult.items.length !== cachedResult.total;
    }

    _fetchMoreData() {
        if (!this._hasMoreData() || this.state.isLoadingTail) {
            return
        }
        var page = cachedResult.nextPage;
        this._fetchData(page)
    }

    _onRefresh(){
        if (!this._hasMoreData() || this.state.isRefreshing){
            console.log('no more data')
            return;
        }

        console.log('onRefresh');

        this._fetchData(0);

    }

    _loadPage(){
        this.props.navigator.push({
            name: 'detail',
            component: Detail,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderFooter={this._renderFooter}
                    onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={20}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing} onRefresh={this._onRefresh}
                            tintColor="#ff6600"
                            title="拼命加载中..."
                        />
                    }
                    enableEmptySections
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
}

export default List;
