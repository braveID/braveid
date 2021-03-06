import React,{ Component } from 'react'
import { StackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, WebView, ListView, ListRenderItem, Button} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Constants, WebBrowser } from 'expo';


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            result : null
        }
    }

    static navigationOptions = {
        title: 'Welcome',
        // headerStyle: {
        //     backgroundColor: 'gray'
        //   },
        //   headerTitleStyle: {
        //     color: '#fff'
        //   }
    };

    componentWillMount() {
        console.log(this.props)
    }
    
    incrementCount(){
        console.log('clicked')
        this.props.increment()
    }

    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://expo.io');
        this.setState({ result });
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
                <Text style={{color : 'white', fontSize: 25}}> Welcome to BraveID </Text>
                <Button title='increment' onPress={() => {this.incrementCount()}}> Inc </Button>
                <Button title='log store' onPress={() => {console.log(store.getState())}}> Log store </Button>
                <Button title='navigate' onPress={() => {this.props.changeScreen('Profile')}}> Navigate </Button>
                <Button title='Facebook' onPress={() => {logIn()}}> Navigate </Button>
                <Button
                    style={styles.paragraph}
                    title="Open WebBrowser"
                    onPress={this._handlePressButtonAsync}
                />
                <Text style={{color : 'white'}}>{this.state.result && JSON.stringify(this.state.result)}</Text>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators,dispatch)
}

async function logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('367921270333733', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(`Hi ${(await response.json()).name}!`);
    }
  }

export default connect(() => { return {} }, mapDispatchToProps)(Home);