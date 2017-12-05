import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button, StatusBar, Image } from 'react-native';
import { connect, MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { SocialIcon } from 'react-native-elements'

import loginBg from '../assets/loginbg.png'
import { checkId } from '../actions/actions';

const magenta = '#c93871'


class Profile extends Component {
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        title: 'BraveID',
        headerTitleStyle: {
            color: magenta
        },
        headerStyle: {
            backgroundColor: 'black',
        },
        tintColor: magenta,
        titleStyle: {
        color: 'black'
        }   
    };

    incrementCount(){
        console.log('clicked')
        this.props.increment()
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <Text style={{color : 'white', fontSize: 50, bottom : 150, fontWeight : 'bold'}}> BraveID </Text>
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    onPress={() => {
                        let fbData = loginWithFacebook()
                        fbData.then((data) => this.props.onFacebookLogin(data))

                    }}
                    type='facebook'
                    style={{
                        bottom : 100,
                        width : 300
                    }}
                />
            </View>
        );
    }
}

// async function loginWithFacebook() {
//     const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('367921270333733', {
//         permissions: ['public_profile'],
//       });
//     if (type === 'success') {
//       // Get the user's name using Facebook's Graph API
//       const response = await fetch(
//         `https://graph.facebook.com/me?access_token=${token}`);
//       console.log(`Hi ${(await response.json()).name}!`);
//     }
//   }

  async function loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('367921270333733', {
        permissions: ['public_profile'],
        behavior: 'web'
      })

    if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const res = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const response = await res.json();
        const photoURL = await getProfilePicUrl(token,response.id)
        const data = {
            ...response,
            photoURL : photoURL
        }
        console.log(data)

        return data
        
    }
}

/**
 * Retorna a URL da foto de perfil do Face
 * @param {String} token adquirido com Expo.Facebook.logInWithReadPermissionsAsync
 * @param {String} userId ID do usuário no face
 */

async function getProfilePicUrl(token, userId) {
    const res = await fetch(`https://graph.facebook.com/${userId}/picture?access_token=${token}&type=large`);
    const response = await res;
    if (response.status === 200) {
        return response.url
        
        // 1. Checar se user existe
        // 2. Criar user ou ir pro profile
    }
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
}

export default connect((state) => { return { user : state.user } }, mapDispatchToProps)(Profile);
