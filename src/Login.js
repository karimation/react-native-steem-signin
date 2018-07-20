import { StyleSheet, View, WebView, AsyncStorage, Text } from 'react-native';
import React, { Component } from 'react';

// Change these to reflect
// fetch url
//const LOGIN_URL = "https://5bff8907.ngrok.io/api/login"
const LOGIN_URL = "https://v2.steemconnect.com/oauth2/authorize?client_id=steemitgram&redirect_uri=http%3A%2F%2Flocalhost%3A4040%2Fapi%2Fauth%2Flogin%2F&scope=login";

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null,
    };


    onNavigationStateChange(navState) {
        // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
        // change this line.
        console.log('new url: ' + navState.url)
        /*if (navState.url == HOME_URL) {
            this.setState({
                loggedIn: true,
            });
        }*/
        if (navState.url.indexOf('http://localhost:4040/api/auth/login/') === 0) {
            console.log('/n open------>')
            AsyncStorage.setItem('userToken', 'abc')
            this.props.navigation.navigate('App')
        }
    }

    render() {

        return (
            <View style={[styles.container]}>
                <WebView
                    ref={'webview'}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: LOGIN_URL }}
                    javaScriptEnabled={true}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    scalesPageToFit={true}
                />
            </View>
        );
    }
}