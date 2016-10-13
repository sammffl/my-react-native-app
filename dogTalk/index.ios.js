/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Navigator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import List from './app/creation';
import Edit from './app/edit';
import Account from './app/account';


export default class dogTalk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'list',
            notifCount: 0,
            presses: 0,
        };
    }

    render() {
        return (
            <TabBarIOS
                tintColor="#ee735c"
            >
                <Icon.TabBarItem
                    title="List"
                    iconName="ios-videocam-outline"
                    selectedIconName="ios-videocam"
                    selected={this.state.selectedTab === 'list'}
                    onPress={() => { this.setState({ selectedTab: 'list', }); }}
                >
                    <Navigator
                        initialRoute={{ name: 'list', component: List}}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.FloatFromRight
                        }}
                        renderScene={(route, navigator) => {
                            let Component =route.component;
                            return <Component {...route.params} navigator={navigator}/>
                        }}
                    />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    title="Edit"
                    iconName="ios-recording-outline"
                    selectedIconName="ios-recording"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab === 'edit'}
                    onPress={() => { this.setState({ selectedTab: 'edit', notifCount: this.state.notifCount + 1, }); }}
                >
                    <Edit />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="ios-more-outline"
                    selectedIconName="ios-more"
                    renderAsOriginal
                    title="More"
                    selected={this.state.selectedTab === 'account'}
                    onPress={() => { this.setState({ selectedTab: 'account', presses: this.state.presses + 1 }); }}
                >
                    <Account />
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('dogTalk', () => dogTalk);
